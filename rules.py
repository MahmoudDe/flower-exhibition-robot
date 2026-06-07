import collections
import collections.abc

# Experta depends on an older collections.Mapping name.
collections.Mapping = collections.abc.Mapping

from experta import DefFacts, KnowledgeEngine, MATCH, Rule, TEST

from domain import HEIGHT, ITEMS, LOAD_CANDIDATES, MAX_LOAD, START, WAREHOUSE, WIDTH
from facts import Cargo, Goal, Grid, LoadBatch, Need, Operation, Pavilion, Robot, Violation, Warehouse
from utils import unique


def item_name(item):
    return item.pavilion


def fact_pavilion(name):
    item = tuple(filter(lambda value: value.pavilion == name, ITEMS))[0]
    x, y = item.pos
    return Pavilion(name=item.pavilion, flower=item.flower, x=x, y=y)


def fact_need(item):
    return Need(pavilion=item.pavilion, flower=item.flower, color=item.color, count=item.count)


def used_names(amounts, names):
    match amounts, names:
        case (), ():
            return ()
        case (0, *ar), (_, *nr):
            return used_names(tuple(ar), tuple(nr))
        case (_, *ar), (name, *nr):
            return (name,) + used_names(tuple(ar), tuple(nr))


def fact_load_batch(batch):
    flowers = unique(used_names(batch, tuple(map(lambda item: item.flower, ITEMS))))
    colors = unique(used_names(batch, tuple(map(lambda item: item.color, ITEMS))))
    return LoadBatch(total=sum(batch), same_flower=len(flowers) == 1, same_color=len(colors) == 1, label=str(batch))


class FlowerRobotKB(KnowledgeEngine):
    # Initial facts loaded from the current JSON data.
    @DefFacts()
    def initial_state(self):
        yield Grid(width=WIDTH, height=HEIGHT)
        yield Warehouse(x=WAREHOUSE[0], y=WAREHOUSE[1])
        yield Robot(x=START[0], y=START[1], load=0)
        yield from tuple(map(fact_pavilion, unique(tuple(map(item_name, ITEMS)))))
        yield from tuple(map(fact_need, ITEMS))
        yield from tuple(map(fact_load_batch, LOAD_CANDIDATES))

    # Movement rules create one-step operations inside grid limits.
    @Rule(Robot(x=MATCH.x, y=MATCH.y), Grid(width=MATCH.w), TEST(lambda x, w: x < w), salience=40)
    def move_right(self, x, y):
        self.declare(Operation(kind="move-right", x=x + 1, y=y, cost=1))

    @Rule(Robot(x=MATCH.x, y=MATCH.y), TEST(lambda x: x > 1), salience=40)
    def move_left(self, x, y):
        self.declare(Operation(kind="move-left", x=x - 1, y=y, cost=1))

    @Rule(Robot(x=MATCH.x, y=MATCH.y), Grid(height=MATCH.h), TEST(lambda y, h: y < h), salience=40)
    def move_up(self, x, y):
        self.declare(Operation(kind="move-up", x=x, y=y + 1, cost=1))

    @Rule(Robot(x=MATCH.x, y=MATCH.y), TEST(lambda y: y > 1), salience=40)
    def move_down(self, x, y):
        self.declare(Operation(kind="move-down", x=x, y=y - 1, cost=1))

    # Loading is legal at the warehouse with one flower kind.
    @Rule(
        Robot(x=MATCH.x, y=MATCH.y),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(total=MATCH.total, same_flower=True),
        TEST(lambda total: total <= MAX_LOAD),
        salience=30,
    )
    def load_one_flower(self, total):
        self.declare(Operation(kind="load", mode="one-flower", load=total, cost=1))

    # Loading is also legal with one shared color.
    @Rule(
        Robot(x=MATCH.x, y=MATCH.y),
        Warehouse(x=MATCH.x, y=MATCH.y),
        LoadBatch(total=MATCH.total, same_color=True),
        TEST(lambda total: total <= MAX_LOAD),
        salience=30,
    )
    def load_one_color(self, total):
        self.declare(Operation(kind="load", mode="one-color", load=total, cost=1))

    # Unload only at the matching pavilion.
    @Rule(
        Robot(x=MATCH.x, y=MATCH.y),
        Pavilion(name=MATCH.name, x=MATCH.x, y=MATCH.y),
        Cargo(pavilion=MATCH.name, count=MATCH.count),
        TEST(lambda count: count > 0),
        salience=20,
    )
    def unload_matching_pavilion(self, name, count):
        self.declare(Operation(kind="unload", pavilion=name, load=count, cost=1))

    # Constraint facts mark invalid states.
    @Rule(LoadBatch(total=MATCH.total), TEST(lambda total: total > MAX_LOAD), salience=100)
    def capacity_violation(self, total):
        self.declare(Violation(kind="capacity", total=total))

    @Rule(LoadBatch(same_flower=False, same_color=False), salience=100)
    def load_shape_violation(self):
        self.declare(Violation(kind="mixed-flower-and-color"))

    @Rule(Cargo(pavilion=MATCH.pavilion), Pavilion(name=MATCH.other), TEST(lambda pavilion, other: pavilion != other), salience=10)
    def unload_target_violation(self, pavilion, other):
        self.declare(Violation(kind="wrong-pavilion", cargo=pavilion, target=other))

    @Rule(Robot(load=0), salience=5)
    def possible_goal_shell(self):
        self.declare(Goal(robot_empty=True))


# Build and reset the knowledge base.
def bootstrap_kb():
    kb = FlowerRobotKB()
    kb.reset()
    return kb
