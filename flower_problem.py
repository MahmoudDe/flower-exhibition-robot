import json
import os
from dataclasses import dataclass

from helpers import deduplicate


# Switch scenarios here, or set FLOWER_DATA_FILE=test_data.json when running.
DATA_FILE = os.environ.get("FLOWER_DATA_FILE", "test_data.basic.json")


@dataclass(frozen=True)
class DeliveryItem:
    pavilion: str
    flower: str
    color: str
    count: int
    pos: tuple


@dataclass(frozen=True)
class RobotState:
    pos: tuple
    remaining: tuple
    cargo: tuple


@dataclass(frozen=True)
class SearchNode:
    state: RobotState
    cost: int
    path: tuple


@dataclass(frozen=True)
class SearchResult:
    node: SearchNode
    generated_sample: tuple
    generated_total: int


def load_scenario():
    with open(DATA_FILE, encoding="utf-8") as file:
        return json.load(file)


SCENARIO = load_scenario()


def to_position(value):
    return tuple(value)


def grid_size(name):
    return SCENARIO["grid"][name]


def make_delivery_item(pavilion, color):
    return DeliveryItem(
        pavilion["name"],
        pavilion["flower"],
        color,
        pavilion["needs"][color],
        to_position(pavilion["position"]),
    )


def delivery_items_for_pavilion(pavilion):
    return tuple(make_delivery_item(pavilion, color) for color in pavilion["needs"])


def flatten_groups(groups):
    flat = ()
    for group in groups:
        flat = flat + tuple(group)
    return flat


def build_delivery_items():
    return flatten_groups(tuple(delivery_items_for_pavilion(pavilion) for pavilion in SCENARIO["pavilions"]))


def pavilion_total_demand(name):
    return sum(item.count for item in DELIVERY_ITEMS if item.pavilion == name)


def largest_or_zero(values):
    return max(values) if values else 0


def calculate_robot_capacity():
    pavilion_names = deduplicate(tuple(item.pavilion for item in DELIVERY_ITEMS))
    demands = tuple(pavilion_total_demand(name) for name in pavilion_names)
    return largest_or_zero(demands)


def names_for_positive_amounts(amounts, names):
    picked = ()
    for amount, name in zip(amounts, names):
        if amount > 0:
            picked = picked + (name,)
    return picked


def is_valid_load(batch):
    flowers = deduplicate(names_for_positive_amounts(batch, ITEM_FLOWERS))
    colors = deduplicate(names_for_positive_amounts(batch, ITEM_COLORS))
    total = sum(batch)
    same_flower = len(flowers) == 1
    same_color = len(colors) == 1
    return 0 < total <= ROBOT_CAPACITY and (same_flower or same_color)


def load_amounts_for_pavilion(name):
    return tuple(item.count if item.pavilion == name else 0 for item in DELIVERY_ITEMS)


def load_amounts_for_color(color):
    return tuple(item.count if item.color == color else 0 for item in DELIVERY_ITEMS)


def build_allowed_loads():
    pavilion_loads = tuple(load_amounts_for_pavilion(name) for name in deduplicate(ITEM_PAVILIONS))
    color_loads = tuple(load_amounts_for_color(color) for color in deduplicate(ITEM_COLORS))
    return deduplicate(tuple(load for load in pavilion_loads + color_loads if is_valid_load(load)))


def delivery_target(pavilion):
    return (pavilion["name"], to_position(pavilion["position"]))


def build_delivery_targets():
    return (("Warehouse", WAREHOUSE),) + tuple(delivery_target(pavilion) for pavilion in SCENARIO["pavilions"])


GRID_WIDTH = grid_size("width")
GRID_HEIGHT = grid_size("height")
WAREHOUSE = to_position(SCENARIO["warehouse"])
ROBOT_START = to_position(SCENARIO["robot_start"])
NO_COST = 10**9

DELIVERY_ITEMS = build_delivery_items()
ITEM_PAVILIONS = tuple(item.pavilion for item in DELIVERY_ITEMS)
ITEM_FLOWERS = tuple(item.flower for item in DELIVERY_ITEMS)
ITEM_COLORS = tuple(item.color for item in DELIVERY_ITEMS)
ITEM_POSITIONS = tuple(item.pos for item in DELIVERY_ITEMS)
INITIAL_REMAINING = tuple(item.count for item in DELIVERY_ITEMS)
EMPTY_CARGO = tuple(0 for _ in DELIVERY_ITEMS)
ROBOT_CAPACITY = calculate_robot_capacity()
ALLOWED_LOADS = build_allowed_loads()
DELIVERY_TARGETS = build_delivery_targets()
