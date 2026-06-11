import collections
import collections.abc

collections.Mapping = collections.abc.Mapping

from experta import DefFacts, KnowledgeEngine, MATCH, Rule, TEST

from cost_estimate import estimate_remaining_cost
from flower_problem import (
    ALLOWED_LOADS,
    DELIVERY_ITEMS,
    GRID_HEIGHT,
    GRID_WIDTH,
    ROBOT_CAPACITY,
    ROBOT_START,
    WAREHOUSE,
)
from helpers import amounts_fit, deduplicate, is_empty, subtract_amounts
from kb_facts import (
    CurrentState,
    GeneratedState,
    Goal,
    Grid,
    LoadBatch,
    Need,
    Pavilion,
    Robot,
    SearchConfig,
    Solution,
    TreeLine,
    Violation,
    Warehouse,
)


def amounts_to_text(values):
    return ",".join(map(str, values))


def text_to_amounts(text):
    return tuple(map(int, text.split(","))) if text else ()


def path_to_text(path):
    return "|".join(path)


def text_to_path(text):
    return tuple(text.split("|")) if text else ()


def pavilion_name(item):
    return item.pavilion


def names_for_positive_amounts(amounts, names):
    picked = ()
    for amount, name in zip(amounts, names):
        if amount > 0:
            picked = picked + (name,)
    return picked


def is_valid_load(batch):
    flowers = deduplicate(names_for_positive_amounts(batch, tuple(item.flower for item in DELIVERY_ITEMS)))
    colors = deduplicate(names_for_positive_amounts(batch, tuple(item.color for item in DELIVERY_ITEMS)))
    total = sum(batch)
    return 0 < total <= ROBOT_CAPACITY and (len(flowers) == 1 or len(colors) == 1)


def describe_item_line(amount, item):
    if amount <= 0:
        return ""
    return item.pavilion + ":" + item.flower + ":" + item.color + "x" + str(amount)


def join_non_empty(parts):
    return ", ".join(part for part in parts if part)


def format_load_description(batch):
    lines = tuple(describe_item_line(amount, item) for amount, item in zip(batch, DELIVERY_ITEMS))
    return join_non_empty(lines)


def unload_amounts_at(cargo, pos, positions):
    result = ()
    for amount, item_pos in zip(cargo, positions):
        result = result + ((0, amount)[item_pos == pos],)
    return result


def amount_to_unload_here(cargo, remaining, pos, positions):
    at_pos = unload_amounts_at(cargo, pos, positions)
    return tuple(min(left, right) for left, right in zip(at_pos, remaining))


def make_pavilion_fact(name):
    item = next(item for item in DELIVERY_ITEMS if item.pavilion == name)
    x, y = item.pos
    return Pavilion(name=item.pavilion, flower=item.flower, x=x, y=y)


def make_need_fact(item):
    return Need(pavilion=item.pavilion, flower=item.flower, color=item.color, count=item.count)


def make_load_batch_fact(batch):
    flowers = deduplicate(names_for_positive_amounts(batch, tuple(item.flower for item in DELIVERY_ITEMS)))
    colors = deduplicate(names_for_positive_amounts(batch, tuple(item.color for item in DELIVERY_ITEMS)))
    return LoadBatch(
        total=sum(batch),
        same_flower=len(flowers) == 1,
        same_color=len(colors) == 1,
        label=amounts_to_text(batch),
    )


def add_search_state(engine, x, y, remaining, cargo, cost, path, action):
    item_positions = tuple(item.pos for item in DELIVERY_ITEMS)
    estimated = estimate_remaining_cost((x, y), remaining, cargo, item_positions)
    total = cost + estimated
    engine.declare(
        GeneratedState(
            x=x,
            y=y,
            remaining=amounts_to_text(remaining),
            cargo=amounts_to_text(cargo),
            g=cost,
            h=estimated,
            f=total,
            path=path_to_text(path),
            action=action,
        )
    )
    engine.declare(
        TreeLine(
            text="g="
            + str(cost)
            + " h="
            + str(estimated)
            + " f="
            + str(total)
            + " pos=("
            + str(x)
            + ", "
            + str(y)
            + ") cargo="
            + str(cargo)
            + " remaining="
            + str(remaining)
        )
    )


class FlowerRobotKnowledge(KnowledgeEngine):
    @DefFacts()
    def initial_facts(self):
        yield Grid(width=GRID_WIDTH, height=GRID_HEIGHT)
        yield Warehouse(x=WAREHOUSE[0], y=WAREHOUSE[1])
        yield Robot(x=ROBOT_START[0], y=ROBOT_START[1], load=0)
        yield from tuple(make_pavilion_fact(name) for name in deduplicate(tuple(pavilion_name(item) for item in DELIVERY_ITEMS)))
        yield from tuple(make_need_fact(item) for item in DELIVERY_ITEMS)
        yield from tuple(make_load_batch_fact(batch) for batch in ALLOWED_LOADS)
        yield SearchConfig(mode="astar")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Grid(width=MATCH.w),
        TEST(lambda x, w: x < w),
        salience=40,
    )
    def move_right(self, x, y, remaining, cargo, g, path):
        add_search_state(
            self,
            x + 1,
            y,
            text_to_amounts(remaining),
            text_to_amounts(cargo),
            g + 1,
            text_to_path(path) + ("move-right",),
            "move-right",
        )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda x: x > 1),
        salience=40,
    )
    def move_left(self, x, y, remaining, cargo, g, path):
        add_search_state(
            self,
            x - 1,
            y,
            text_to_amounts(remaining),
            text_to_amounts(cargo),
            g + 1,
            text_to_path(path) + ("move-left",),
            "move-left",
        )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Grid(height=MATCH.h),
        TEST(lambda y, h: y < h),
        salience=40,
    )
    def move_up(self, x, y, remaining, cargo, g, path):
        add_search_state(
            self,
            x,
            y + 1,
            text_to_amounts(remaining),
            text_to_amounts(cargo),
            g + 1,
            text_to_path(path) + ("move-up",),
            "move-up",
        )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda y: y > 1),
        salience=40,
    )
    def move_down(self, x, y, remaining, cargo, g, path):
        add_search_state(
            self,
            x,
            y - 1,
            text_to_amounts(remaining),
            text_to_amounts(cargo),
            g + 1,
            text_to_path(path) + ("move-down",),
            "move-down",
        )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(label=MATCH.label, total=MATCH.total, same_flower=True),
        TEST(lambda total, cargo: total <= ROBOT_CAPACITY and is_empty(text_to_amounts(cargo))),
        salience=30,
    )
    def load_same_flower(self, x, y, remaining, cargo, g, path, label):
        batch = text_to_amounts(label)
        remaining_amounts = text_to_amounts(remaining)
        if amounts_fit(batch, remaining_amounts) and is_valid_load(batch):
            add_search_state(
                self,
                x,
                y,
                remaining_amounts,
                batch,
                g + 1,
                text_to_path(path) + ("load " + format_load_description(batch),),
                "load",
            )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(label=MATCH.label, total=MATCH.total, same_color=True, same_flower=False),
        TEST(lambda total, cargo: total <= ROBOT_CAPACITY and is_empty(text_to_amounts(cargo))),
        salience=30,
    )
    def load_same_color(self, x, y, remaining, cargo, g, path, label):
        batch = text_to_amounts(label)
        remaining_amounts = text_to_amounts(remaining)
        if amounts_fit(batch, remaining_amounts) and is_valid_load(batch):
            add_search_state(
                self,
                x,
                y,
                remaining_amounts,
                batch,
                g + 1,
                text_to_path(path) + ("load " + format_load_description(batch),),
                "load",
            )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(
            lambda x, y, remaining, cargo: sum(
                amount_to_unload_here(
                    text_to_amounts(cargo),
                    text_to_amounts(remaining),
                    (x, y),
                    tuple(item.pos for item in DELIVERY_ITEMS),
                )
            )
            > 0
        ),
        salience=20,
    )
    def unload_at_pavilion(self, x, y, remaining, cargo, g, path):
        remaining_amounts = text_to_amounts(remaining)
        cargo_amounts = text_to_amounts(cargo)
        positions = tuple(item.pos for item in DELIVERY_ITEMS)
        unload_amounts = amount_to_unload_here(cargo_amounts, remaining_amounts, (x, y), positions)
        if sum(unload_amounts) > 0:
            add_search_state(
                self,
                x,
                y,
                subtract_amounts(remaining_amounts, unload_amounts),
                subtract_amounts(cargo_amounts, unload_amounts),
                g + 1,
                text_to_path(path) + ("unload " + format_load_description(unload_amounts),),
                "unload",
            )

    @Rule(LoadBatch(total=MATCH.total), TEST(lambda total: total > ROBOT_CAPACITY), salience=100)
    def capacity_violation(self, total):
        self.declare(Violation(kind="capacity", total=total))

    @Rule(LoadBatch(same_flower=False, same_color=False), salience=100)
    def load_shape_violation(self):
        self.declare(Violation(kind="mixed-flower-and-color"))

    @Rule(
        GeneratedState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda remaining, cargo: is_empty(text_to_amounts(remaining)) and is_empty(text_to_amounts(cargo))),
        salience=90,
    )
    def goal_reached(self, g, path):
        self.declare(Goal(reached=True))
        self.declare(Solution(g=g, path=path))

    @Rule(Solution(g=MATCH.g, path=MATCH.path), salience=80)
    def print_solution(self, g, path):
        self.declare(TreeLine(text="GOAL g=" + str(g) + " path=" + path))


def read_generated_states(knowledge_base):
    generated = []
    for fact in knowledge_base.facts.values():
        if isinstance(fact, GeneratedState):
            generated.append(fact)
    return tuple(generated)


def setup_world_facts(knowledge_base, x, y, cargo):
    knowledge_base.declare(Grid(width=GRID_WIDTH, height=GRID_HEIGHT))
    knowledge_base.declare(Warehouse(x=WAREHOUSE[0], y=WAREHOUSE[1]))
    knowledge_base.declare(Robot(x=x, y=y, load=sum(cargo)))
    for pavilion in deduplicate(tuple(pavilion_name(item) for item in DELIVERY_ITEMS)):
        knowledge_base.declare(make_pavilion_fact(pavilion))
    for item in DELIVERY_ITEMS:
        knowledge_base.declare(make_need_fact(item))
    for batch in ALLOWED_LOADS:
        knowledge_base.declare(make_load_batch_fact(batch))


def generate_next_states(x, y, remaining, cargo, cost, path):
    engine = FlowerRobotKnowledge()
    engine.reset()
    setup_world_facts(engine, x, y, cargo)
    engine.declare(
        CurrentState(
            x=x,
            y=y,
            remaining=amounts_to_text(remaining),
            cargo=amounts_to_text(cargo),
            g=cost,
            path=path_to_text(path),
        )
    )
    engine.run()
    return read_generated_states(engine)
