import collections
import collections.abc

collections.Mapping = collections.abc.Mapping

# Experta knowledge base for the Flower Robot assignment.
# Requirement 1: DefFacts initial grid, warehouse, robot, pavilions, needs, load batches.
# Requirement 2: move/load/unload rules generate successor states from CurrentState.
# Requirement 3: capacity and mixed-load Violation rules (salience=100).
# Requirement 4: goal_reached + print_solution rules.
# Requirement 5: TreeLine facts emitted for every generated state (DFS via search driver).
# Requirement 6: GeneratedState carries g, h, f; search.py orders frontier by f(n) for A*.

from experta import DefFacts, KnowledgeEngine, MATCH, Rule, TEST

from domain import (
    HEIGHT,
    ITEMS,
    LOAD_CANDIDATES,
    MAX_LOAD,
    START,
    WAREHOUSE,
    WIDTH,
)
from facts import (
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
from heuristic import heuristic
from utils import all_zero, choose, leq_tuple, sub_tuple, unique


def tuple_text(values):
    return ",".join(map(str, values))


def parse_tuple(text):
    return tuple(map(int, text.split(","))) if text else ()


def path_text(path):
    return "|".join(path)


def parse_path(text):
    return tuple(text.split("|")) if text else ()


def item_name(item):
    return item.pavilion


def used_names(amounts, names):
    match amounts, names:
        case (), ():
            return ()
        case (0, *ar), (_, *nr):
            return used_names(tuple(ar), tuple(nr))
        case (_, *ar), (name, *nr):
            return (name,) + used_names(tuple(ar), tuple(nr))


def valid_load(batch):
    total = sum(batch)
    flowers = unique(used_names(batch, tuple(map(lambda item: item.flower, ITEMS))))
    colors = unique(used_names(batch, tuple(map(lambda item: item.color, ITEMS))))
    return (0 < total <= MAX_LOAD) and ((len(flowers) == 1) or (len(colors) == 1))


def describe_item(amount, item):
    return choose(amount > 0, lambda: item.pavilion + ":" + item.flower + ":" + item.color + "x" + str(amount), lambda: "")


def trim_empty(parts):
    match parts:
        case ():
            return ()
        case ("", *rest):
            return trim_empty(tuple(rest))
        case (head, *rest):
            return (head,) + trim_empty(tuple(rest))


def join_parts(parts):
    match parts:
        case ():
            return ""
        case (head,):
            return head
        case (head, *rest):
            return head + ", " + join_parts(tuple(rest))


def describe_batch(batch):
    return join_parts(trim_empty(tuple(map(lambda pair: describe_item(pair[0], pair[1]), zip(batch, ITEMS)))))


def unload_amount(cargo, pos, positions):
    match cargo, positions:
        case (), ():
            return ()
        case (amount, *ar), (item_pos, *pr):
            return ((0, amount)[item_pos == pos],) + unload_amount(tuple(ar), pos, tuple(pr))


def unloadable_batch(cargo, remaining, pos, positions):
    at_pos = unload_amount(cargo, pos, positions)
    return tuple(map(lambda pair: min(pair[0], pair[1]), zip(at_pos, remaining)))


def fact_pavilion(name):
    item = tuple(filter(lambda value: value.pavilion == name, ITEMS))[0]
    x, y = item.pos
    return Pavilion(name=item.pavilion, flower=item.flower, x=x, y=y)


def fact_need(item):
    return Need(pavilion=item.pavilion, flower=item.flower, color=item.color, count=item.count)


def fact_load_batch(batch):
    flowers = unique(used_names(batch, tuple(map(lambda item: item.flower, ITEMS))))
    colors = unique(used_names(batch, tuple(map(lambda item: item.color, ITEMS))))
    return LoadBatch(total=sum(batch), same_flower=len(flowers) == 1, same_color=len(colors) == 1, label=tuple_text(batch))


def declare_generated(engine, x, y, remaining, cargo, g, path, action):
    h = heuristic((x, y), remaining, cargo, tuple(map(lambda item: item.pos, ITEMS)))
    f = g + h
    engine.declare(
        GeneratedState(
            x=x,
            y=y,
            remaining=tuple_text(remaining),
            cargo=tuple_text(cargo),
            g=g,
            h=h,
            f=f,
            path=path_text(path),
            action=action,
        )
    )
    engine.declare(
        TreeLine(
            text="g="
            + str(g)
            + " h="
            + str(h)
            + " f="
            + str(f)
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


class FlowerRobotKB(KnowledgeEngine):
    @DefFacts()
    def initial_facts(self):
        yield Grid(width=WIDTH, height=HEIGHT)
        yield Warehouse(x=WAREHOUSE[0], y=WAREHOUSE[1])
        yield Robot(x=START[0], y=START[1], load=0)
        yield from tuple(map(fact_pavilion, unique(tuple(map(item_name, ITEMS)))))
        yield from tuple(map(fact_need, ITEMS))
        yield from tuple(map(fact_load_batch, LOAD_CANDIDATES))
        yield SearchConfig(mode="astar")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Grid(width=MATCH.w),
        TEST(lambda x, w: x < w),
        salience=40,
    )
    def move_right(self, x, y, remaining, cargo, g, path):
        declare_generated(self, x + 1, y, parse_tuple(remaining), parse_tuple(cargo), g + 1, parse_path(path) + ("move-right",), "move-right")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda x: x > 1),
        salience=40,
    )
    def move_left(self, x, y, remaining, cargo, g, path):
        declare_generated(self, x - 1, y, parse_tuple(remaining), parse_tuple(cargo), g + 1, parse_path(path) + ("move-left",), "move-left")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Grid(height=MATCH.h),
        TEST(lambda y, h: y < h),
        salience=40,
    )
    def move_up(self, x, y, remaining, cargo, g, path):
        declare_generated(self, x, y + 1, parse_tuple(remaining), parse_tuple(cargo), g + 1, parse_path(path) + ("move-up",), "move-up")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda y: y > 1),
        salience=40,
    )
    def move_down(self, x, y, remaining, cargo, g, path):
        declare_generated(self, x, y - 1, parse_tuple(remaining), parse_tuple(cargo), g + 1, parse_path(path) + ("move-down",), "move-down")

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(label=MATCH.label, total=MATCH.total, same_flower=True),
        TEST(lambda total, cargo: total <= MAX_LOAD and all_zero(parse_tuple(cargo))),
        salience=30,
    )
    def load_same_flower(self, x, y, remaining, cargo, g, path, label):
        batch = parse_tuple(label)
        remaining_tuple = parse_tuple(remaining)
        if leq_tuple(batch, remaining_tuple) and valid_load(batch):
            declare_generated(
                self,
                x,
                y,
                remaining_tuple,
                batch,
                g + 1,
                parse_path(path) + ("load " + describe_batch(batch),),
                "load",
            )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(label=MATCH.label, total=MATCH.total, same_color=True, same_flower=False),
        TEST(lambda total, cargo: total <= MAX_LOAD and all_zero(parse_tuple(cargo))),
        salience=30,
    )
    def load_same_color(self, x, y, remaining, cargo, g, path, label):
        batch = parse_tuple(label)
        remaining_tuple = parse_tuple(remaining)
        if leq_tuple(batch, remaining_tuple) and valid_load(batch):
            declare_generated(
                self,
                x,
                y,
                remaining_tuple,
                batch,
                g + 1,
                parse_path(path) + ("load " + describe_batch(batch),),
                "load",
            )

    @Rule(
        CurrentState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda x, y, remaining, cargo: sum(unloadable_batch(parse_tuple(cargo), parse_tuple(remaining), (x, y), tuple(map(lambda item: item.pos, ITEMS)))) > 0),
        salience=20,
    )
    def unload_at_pavilion(self, x, y, remaining, cargo, g, path):
        remaining_tuple = parse_tuple(remaining)
        cargo_tuple = parse_tuple(cargo)
        positions = tuple(map(lambda item: item.pos, ITEMS))
        amount = unloadable_batch(cargo_tuple, remaining_tuple, (x, y), positions)
        if sum(amount) > 0:
            declare_generated(
                self,
                x,
                y,
                sub_tuple(remaining_tuple, amount),
                sub_tuple(cargo_tuple, amount),
                g + 1,
                parse_path(path) + ("unload " + describe_batch(amount),),
                "unload",
            )

    @Rule(LoadBatch(total=MATCH.total), TEST(lambda total: total > MAX_LOAD), salience=100)
    def capacity_violation(self, total):
        self.declare(Violation(kind="capacity", total=total))

    @Rule(LoadBatch(same_flower=False, same_color=False), salience=100)
    def load_shape_violation(self):
        self.declare(Violation(kind="mixed-flower-and-color"))

    @Rule(
        GeneratedState(x=MATCH.x, y=MATCH.y, remaining=MATCH.remaining, cargo=MATCH.cargo, g=MATCH.g, path=MATCH.path),
        TEST(lambda remaining, cargo: all_zero(parse_tuple(remaining)) and all_zero(parse_tuple(cargo))),
        salience=90,
    )
    def goal_reached(self, g, path):
        self.declare(Goal(reached=True))
        self.declare(Solution(g=g, path=path))

    @Rule(Solution(g=MATCH.g, path=MATCH.path), salience=80)
    def print_solution(self, g, path):
        self.declare(TreeLine(text="GOAL g=" + str(g) + " path=" + path))


def collect_facts(kb):
    generated = ()
    tree_lines = ()
    solution = None
    for fact in kb.facts.values():
        match fact:
            case GeneratedState():
                generated = generated + (fact,)
            case TreeLine():
                tree_lines = tree_lines + (fact["text"],)
            case Solution():
                solution = fact
    return generated, tree_lines, solution


def expand_state(x, y, remaining, cargo, g, path):
    kb = FlowerRobotKB()
    kb.reset()
    kb.declare(Grid(width=WIDTH, height=HEIGHT))
    kb.declare(Warehouse(x=WAREHOUSE[0], y=WAREHOUSE[1]))
    kb.declare(Robot(x=x, y=y, load=sum(cargo)))
    for pavilion_name in unique(tuple(map(item_name, ITEMS))):
        kb.declare(fact_pavilion(pavilion_name))
    for item in ITEMS:
        kb.declare(fact_need(item))
    for batch in LOAD_CANDIDATES:
        kb.declare(fact_load_batch(batch))
    kb.declare(
        CurrentState(
            x=x,
            y=y,
            remaining=tuple_text(remaining),
            cargo=tuple_text(cargo),
            g=g,
            path=path_text(path),
        )
    )
    kb.run()
    return collect_facts(kb)


def bootstrap_kb(mode="astar"):
    kb = FlowerRobotKB()
    kb.reset()
    kb.declare(SearchConfig(mode=mode))
    return kb
