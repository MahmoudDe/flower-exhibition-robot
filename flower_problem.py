import json
import os
from dataclasses import dataclass

from helpers import deduplicate
from kb_facts import (
    AmountTuple,
    DeliveryLine,
    DeliveryTarget,
    Grid,
    LoadBatch,
    PositionTuple,
    Robot,
    RobotCapacity,
    SearchLimit,
    TextTuple,
    Warehouse,
)


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


def amounts_to_text(values):
    return ",".join(map(str, values))


def text_to_amounts(text):
    return tuple(map(int, text.split(","))) if text else ()


def text_to_labels(text):
    return tuple(text.split("|")) if text else ()


def text_to_positions(text):
    if not text:
        return ()
    return tuple(tuple(map(int, part.split(","))) for part in text.split("|"))


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


def pavilion_total_demand(name, items):
    return sum(item.count for item in items if item.pavilion == name)


def largest_or_zero(values):
    return max(values) if values else 0


def calculate_robot_capacity(items):
    pavilion_names = deduplicate(tuple(item.pavilion for item in items))
    demands = tuple(pavilion_total_demand(name, items) for name in pavilion_names)
    return largest_or_zero(demands)


def names_for_positive_amounts(amounts, names):
    picked = ()
    for amount, name in zip(amounts, names):
        if amount > 0:
            picked = picked + (name,)
    return picked


def is_valid_load(batch, capacity, flowers, colors):
    picked_flowers = deduplicate(names_for_positive_amounts(batch, flowers))
    picked_colors = deduplicate(names_for_positive_amounts(batch, colors))
    total = sum(batch)
    same_flower = len(picked_flowers) == 1
    same_color = len(picked_colors) == 1
    return 0 < total <= capacity and (same_flower or same_color)


def load_amounts_for_pavilion(name, items):
    return tuple(item.count if item.pavilion == name else 0 for item in items)


def load_amounts_for_color(color, items):
    return tuple(item.count if item.color == color else 0 for item in items)


def build_allowed_loads(items, capacity):
    pavilions = deduplicate(tuple(item.pavilion for item in items))
    colors = deduplicate(tuple(item.color for item in items))
    flowers = tuple(item.flower for item in items)
    item_colors = tuple(item.color for item in items)
    pavilion_loads = tuple(load_amounts_for_pavilion(name, items) for name in pavilions)
    color_loads = tuple(load_amounts_for_color(color, items) for color in colors)
    return deduplicate(
        tuple(
            load
            for load in pavilion_loads + color_loads
            if is_valid_load(load, capacity, flowers, item_colors)
        )
    )


def positions_to_text(positions):
    return "|".join(str(x) + "," + str(y) for x, y in positions)


def labels_to_text(labels):
    return "|".join(labels)


def delivery_line_to_item(fact):
    return DeliveryItem(
        fact["pavilion"],
        fact["flower"],
        fact["color"],
        fact["count"],
        (fact["x"], fact["y"]),
    )


def make_load_batch_fact(batch, items):
    flowers = deduplicate(names_for_positive_amounts(batch, tuple(item.flower for item in items)))
    colors = deduplicate(names_for_positive_amounts(batch, tuple(item.color for item in items)))
    return LoadBatch(
        total=sum(batch),
        same_flower=len(flowers) == 1,
        same_color=len(colors) == 1,
        label=amounts_to_text(batch),
    )


def build_problem_facts():
    items = build_delivery_items()
    warehouse = to_position(SCENARIO["warehouse"])
    start = to_position(SCENARIO["robot_start"])
    width = grid_size("width")
    height = grid_size("height")
    capacity = calculate_robot_capacity(items)

    pavilions = tuple(item.pavilion for item in items)
    flowers = tuple(item.flower for item in items)
    colors = tuple(item.color for item in items)
    positions = tuple(item.pos for item in items)
    initial_remaining = tuple(item.count for item in items)
    empty_cargo = tuple(0 for _ in items)
    allowed_loads = build_allowed_loads(items, capacity)

    facts = [
        Grid(width=width, height=height),
        Warehouse(x=warehouse[0], y=warehouse[1]),
        Robot(x=start[0], y=start[1], load=0),
        RobotCapacity(max_load=capacity),
        SearchLimit(no_cost=10**9),
        AmountTuple(name="initial_remaining", values=amounts_to_text(initial_remaining)),
        AmountTuple(name="empty_cargo", values=amounts_to_text(empty_cargo)),
        TextTuple(name="item_pavilions", values=labels_to_text(pavilions)),
        TextTuple(name="item_flowers", values=labels_to_text(flowers)),
        TextTuple(name="item_colors", values=labels_to_text(colors)),
        PositionTuple(name="item_positions", values=positions_to_text(positions)),
    ]

    for item in items:
        facts.append(
            DeliveryLine(
                pavilion=item.pavilion,
                flower=item.flower,
                color=item.color,
                count=item.count,
                x=item.pos[0],
                y=item.pos[1],
            )
        )

    for batch in allowed_loads:
        facts.append(make_load_batch_fact(batch, items))

    facts.append(DeliveryTarget(name="Warehouse", x=warehouse[0], y=warehouse[1]))
    for pavilion in SCENARIO["pavilions"]:
        pos = to_position(pavilion["position"])
        facts.append(DeliveryTarget(name=pavilion["name"], x=pos[0], y=pos[1]))

    return tuple(facts)


def find_fact(facts, fact_type, name=None):
    for fact in facts:
        if isinstance(fact, fact_type) and (name is None or fact.get("name") == name):
            return fact
    raise LookupError("Missing fact: " + str(fact_type) + " name=" + str(name))


def read_amounts(facts, name):
    return text_to_amounts(find_fact(facts, AmountTuple, name)["values"])


def read_labels(facts, name):
    return text_to_labels(find_fact(facts, TextTuple, name)["values"])


def read_positions(facts, name):
    return text_to_positions(find_fact(facts, PositionTuple, name)["values"])


def read_delivery_items(facts):
    return tuple(delivery_line_to_item(fact) for fact in facts if isinstance(fact, DeliveryLine))


def read_allowed_loads(facts):
    loads = ()
    for fact in facts:
        if isinstance(fact, LoadBatch):
            loads = loads + (text_to_amounts(fact["label"]),)
    return loads


def read_delivery_targets(facts):
    targets = ()
    for fact in facts:
        if isinstance(fact, DeliveryTarget):
            targets = targets + ((fact["name"], (fact["x"], fact["y"])),)
    return targets


PROBLEM_FACTS = build_problem_facts()

GRID_WIDTH = find_fact(PROBLEM_FACTS, Grid)["width"]
GRID_HEIGHT = find_fact(PROBLEM_FACTS, Grid)["height"]
WAREHOUSE = (find_fact(PROBLEM_FACTS, Warehouse)["x"], find_fact(PROBLEM_FACTS, Warehouse)["y"])
ROBOT_START = (find_fact(PROBLEM_FACTS, Robot)["x"], find_fact(PROBLEM_FACTS, Robot)["y"])
NO_COST = find_fact(PROBLEM_FACTS, SearchLimit)["no_cost"]
ROBOT_CAPACITY = find_fact(PROBLEM_FACTS, RobotCapacity)["max_load"]

DELIVERY_ITEMS = read_delivery_items(PROBLEM_FACTS)
ITEM_PAVILIONS = read_labels(PROBLEM_FACTS, "item_pavilions")
ITEM_FLOWERS = read_labels(PROBLEM_FACTS, "item_flowers")
ITEM_COLORS = read_labels(PROBLEM_FACTS, "item_colors")
ITEM_POSITIONS = read_positions(PROBLEM_FACTS, "item_positions")
INITIAL_REMAINING = read_amounts(PROBLEM_FACTS, "initial_remaining")
EMPTY_CARGO = read_amounts(PROBLEM_FACTS, "empty_cargo")
ALLOWED_LOADS = read_allowed_loads(PROBLEM_FACTS)
DELIVERY_TARGETS = read_delivery_targets(PROBLEM_FACTS)
