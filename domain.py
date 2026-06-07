import json
from dataclasses import dataclass

from utils import choose, unique


# DATA_FILE = "test_data.json"
DATA_FILE = "test_data.basic.json"

# One requested bouquet line: pavilion, flower kind, color, amount, and target cell.
@dataclass(frozen=True)
class Item:
    pavilion: str
    flower: str
    color: str
    count: int
    pos: tuple


# Full robot state used by A*: current cell, remaining demand, and robot cargo.
@dataclass(frozen=True)
class State:
    pos: tuple
    remaining: tuple
    cargo: tuple


# Search tree node: state plus real cost g(n) and the action path.
@dataclass(frozen=True)
class Node:
    state: State
    g: int
    path: tuple


# Final solver result: best node plus generated tree lines.
@dataclass(frozen=True)
class Result:
    node: Node
    generated: tuple


def read_data():
    with open(DATA_FILE, encoding="utf-8") as file:
        return json.load(file)


DATA = read_data()


def as_pos(value):
    return tuple(value)


def grid_value(name):
    return DATA["grid"][name]


def pavilion_item(pavilion, color):
    return Item(pavilion["name"], pavilion["flower"], color, pavilion["needs"][color], as_pos(pavilion["position"]))


def pavilion_items(pavilion):
    return tuple(map(lambda color: pavilion_item(pavilion, color), pavilion["needs"].keys()))


def join_tuples(parts):
    match parts:
        case ():
            return ()
        case (head, *rest):
            return tuple(head) + join_tuples(tuple(rest))


def build_items():
    return join_tuples(tuple(map(pavilion_items, DATA["pavilions"])))


def item_count(item):
    return item.count


def item_pavilion(item):
    return item.pavilion


def item_flower(item):
    return item.flower


def item_color(item):
    return item.color


def item_pos(item):
    return item.pos


def total_for_pavilion(name):
    return sum(tuple(map(item_count, tuple(filter(lambda item: item.pavilion == name, ITEMS)))))


def max_or_zero(values):
    return choose(len(values) > 0, lambda: max(values), lambda: 0)


def compute_max_load():
    return max_or_zero(tuple(map(total_for_pavilion, unique(ITEM_PAVILIONS))))


def used_names(amounts, names):
    match amounts, names:
        case (), ():
            return ()
        case (0, *ar), (_, *nr):
            return used_names(tuple(ar), tuple(nr))
        case (_, *ar), (name, *nr):
            return (name,) + used_names(tuple(ar), tuple(nr))


def valid_batch(batch):
    flowers = unique(used_names(batch, ITEM_FLOWERS))
    colors = unique(used_names(batch, ITEM_COLORS))
    total = sum(batch)
    return (0 < total <= MAX_LOAD) and ((len(flowers) == 1) or (len(colors) == 1))


def amount_by_pavilion(name, item):
    return choose(item.pavilion == name, lambda: item.count, lambda: 0)


def batch_by_pavilion(name):
    return tuple(map(lambda item: amount_by_pavilion(name, item), ITEMS))


def amount_by_color(color, item):
    return choose(item.color == color, lambda: item.count, lambda: 0)


def batch_by_color(color):
    return tuple(map(lambda item: amount_by_color(color, item), ITEMS))


def build_load_candidates():
    pavilion_batches = tuple(map(batch_by_pavilion, unique(ITEM_PAVILIONS)))
    color_batches = tuple(map(batch_by_color, unique(ITEM_COLORS)))
    return unique(tuple(filter(valid_batch, pavilion_batches + color_batches)))


def pavilion_total(pavilion):
    return sum(pavilion["needs"].values())


def target_row(pavilion):
    return (pavilion["name"], as_pos(pavilion["position"]))


def build_targets():
    return (("Warehouse", WAREHOUSE),) + tuple(map(target_row, DATA["pavilions"]))


WIDTH = grid_value("width")
HEIGHT = grid_value("height")
WAREHOUSE = as_pos(DATA["warehouse"])
START = as_pos(DATA["robot_start"])
INF = 10**9

ITEMS = build_items()
ITEM_PAVILIONS = tuple(map(item_pavilion, ITEMS))
ITEM_FLOWERS = tuple(map(item_flower, ITEMS))
ITEM_COLORS = tuple(map(item_color, ITEMS))
ITEM_POSITIONS = tuple(map(item_pos, ITEMS))
INITIAL_REMAINING = tuple(map(item_count, ITEMS))
EMPTY_LOAD = tuple(map(lambda _: 0, ITEMS))
MAX_LOAD = compute_max_load()
LOAD_CANDIDATES = build_load_candidates()
TARGETS = build_targets()
