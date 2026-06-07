import heapq

from domain import (
    EMPTY_LOAD,
    INF,
    INITIAL_REMAINING,
    ITEM_COLORS,
    ITEM_FLOWERS,
    ITEM_POSITIONS,
    ITEM_PAVILIONS,
    ITEMS,
    LOAD_CANDIDATES,
    MAX_LOAD,
    START,
    TARGETS,
    WAREHOUSE,
    Node,
    Result,
    State,
)
from rules import bootstrap_kb
from utils import all_zero, choose, leq_tuple, sub_tuple, unique


# Keep names whose matching amount is nonzero.
def used_names(amounts, names):
    match amounts, names:
        case (), ():
            return ()
        case (0, *ar), (_, *nr):
            return used_names(tuple(ar), tuple(nr))
        case (_, *ar), (name, *nr):
            return (name,) + used_names(tuple(ar), tuple(nr))


# Enforce load rule: one flower kind or one shared color, within max load.
def valid_load(batch):
    total = sum(batch)
    flowers = unique(used_names(batch, ITEM_FLOWERS))
    colors = unique(used_names(batch, ITEM_COLORS))
    return (0 < total <= MAX_LOAD) and ((len(flowers) == 1) or (len(colors) == 1))


# Grid distance with only up, down, left, and right moves.
def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


# Build horizontal step names recursively.
def horizontal_steps(x, target):
    match x == target, x < target:
        case True, _:
            return ()
        case False, True:
            return ("move-right",) + horizontal_steps(x + 1, target)
        case _:
            return ("move-left",) + horizontal_steps(x - 1, target)


# Build vertical step names recursively.
def vertical_steps(y, target):
    match y == target, y < target:
        case True, _:
            return ()
        case False, True:
            return ("move-up",) + vertical_steps(y + 1, target)
        case _:
            return ("move-down",) + vertical_steps(y - 1, target)


# Convert a start cell and target cell into named movement steps.
def step_path(start, target):
    return horizontal_steps(start[0], target[0]) + vertical_steps(start[1], target[1])


# Check whether current cargo contains anything owned by a pavilion.
def cargo_has_pavilion(cargo, pavilion, names=ITEM_PAVILIONS):
    match cargo, names:
        case (), ():
            return False
        case (amount, *ar), (name, *nr):
            return ((amount > 0) and (name == pavilion)) or cargo_has_pavilion(tuple(ar), pavilion, tuple(nr))


# A useful target is warehouse with empty cargo or a pavilion matching cargo.
def valid_target(state, target):
    name, pos = target
    return (pos != state.pos) and (((name == "Warehouse") and all_zero(state.cargo)) or cargo_has_pavilion(state.cargo, name))


# Create a child node that moves directly to a useful target.
def move_node(node, target):
    name, pos = target
    steps = step_path(node.state.pos, pos)
    state = State(pos, node.state.remaining, node.state.cargo)
    return Node(state, node.g + len(steps), node.path + steps + ("arrive " + name,))


# Generate all movement child nodes.
def move_nodes(node):
    return tuple(map(lambda target: move_node(node, target), tuple(filter(lambda target: valid_target(node.state, target), TARGETS))))


# Loading requires warehouse location, empty cargo, and a legal batch.
def can_load(state, batch):
    return (state.pos == WAREHOUSE) and all_zero(state.cargo) and leq_tuple(batch, state.remaining) and valid_load(batch)


# Convert one cargo tuple entry into readable text.
def describe_item(amount, item):
    return choose(amount > 0, lambda: item.pavilion + ":" + item.flower + ":" + item.color + "x" + str(amount), lambda: "")


# Drop empty text fragments from batch descriptions.
def trim_empty(parts):
    match parts:
        case ():
            return ()
        case ("", *rest):
            return trim_empty(tuple(rest))
        case (head, *rest):
            return (head,) + trim_empty(tuple(rest))


# Join text fragments without explicit loop syntax.
def join_parts(parts):
    match parts:
        case ():
            return ""
        case (head,):
            return head
        case (head, *rest):
            return head + ", " + join_parts(tuple(rest))


# Human-readable batch text used in the printed path.
def describe_batch(batch):
    return join_parts(trim_empty(tuple(map(lambda pair: describe_item(pair[0], pair[1]), zip(batch, ITEMS)))))


# Create a child node after one load action.
def load_node(node, batch):
    state = State(node.state.pos, node.state.remaining, batch)
    return Node(state, node.g + 1, node.path + ("load " + describe_batch(batch),))


# Generate all legal load child nodes.
def load_nodes(node):
    return tuple(map(lambda batch: load_node(node, batch), tuple(filter(lambda batch: can_load(node.state, batch), LOAD_CANDIDATES))))


# Cargo entries matching the current pavilion position can be unloaded.
def unload_amount(cargo, pos, positions=ITEM_POSITIONS):
    match cargo, positions:
        case (), ():
            return ()
        case (amount, *ar), (item_pos, *pr):
            return ((0, amount)[item_pos == pos],) + unload_amount(tuple(ar), pos, tuple(pr))


# Create a child node after one unload action.
def unload_node(node, amount):
    state = State(node.state.pos, sub_tuple(node.state.remaining, amount), sub_tuple(node.state.cargo, amount))
    return Node(state, node.g + 1, node.path + ("unload " + describe_batch(amount),))


# Generate an unload child node only once cargo matches this cell.
def unload_nodes(node):
    amount = unload_amount(node.state.cargo, node.state.pos)
    return choose(sum(amount) > 0, lambda: (unload_node(node, amount),), lambda: ())


# The search expansion order: unload, load, then move.
def next_nodes(node):
    return unload_nodes(node) + load_nodes(node) + move_nodes(node)


# Positions linked to cargo currently carried by the robot.
def cargo_positions(cargo, positions=ITEM_POSITIONS):
    match cargo, positions:
        case (), ():
            return ()
        case (amount, *ar), (pos, *pr):
            return choose(amount > 0, lambda: (pos,) + cargo_positions(tuple(ar), tuple(pr)), lambda: cargo_positions(tuple(ar), tuple(pr)))


# Empty tuple means no remaining distance estimate.
def min_or_zero(values):
    return choose(len(values) > 0, lambda: min(values), lambda: 0)


# A* heuristic: distance to warehouse or nearest cargo destination.
def heuristic(state):
    return choose(
        all_zero(state.cargo),
        lambda: choose(all_zero(state.remaining), lambda: 0, lambda: manhattan(state.pos, WAREHOUSE)),
        lambda: min_or_zero(tuple(map(lambda pos: manhattan(state.pos, pos), cargo_positions(state.cargo)))),
    )


# Immutable key used to remember the cheapest cost seen per state.
def state_key(state):
    return (state.pos, state.remaining, state.cargo)


# Goal: no remaining demand and no robot cargo.
def is_goal(state):
    return all_zero(state.remaining) and all_zero(state.cargo)


# Text line shown in the generated search tree output.
def generated_line(node):
    return "g=" + str(node.g) + " h=" + str(heuristic(node.state)) + " pos=" + str(node.state.pos) + " cargo=" + str(node.state.cargo) + " remaining=" + str(node.state.remaining)


# Add a node to the A* priority queue using f(n)=g(n)+h(n).
def push_node(frontier, node, serial):
    heapq.heappush(frontier, (node.g + heuristic(node.state), serial, node))
    return serial + 1


# Add child nodes that improve the best known cost.
def add_nodes(frontier, best, generated, serial, nodes):
    match nodes:
        case ():
            return frontier, best, generated, serial
        case (node, *rest):
            key = state_key(node.state)
            return choose(
                node.g < best.get(key, INF),
                lambda: add_nodes(frontier, best | {key: node.g}, generated + (generated_line(node),), push_node(frontier, node, serial), tuple(rest)),
                lambda: add_nodes(frontier, best, generated, serial, tuple(rest)),
            )


# Recursive A* search over the priority queue.
def search(frontier, best, generated, serial):
    _, _, node = heapq.heappop(frontier)
    return choose(
        node.g == best.get(state_key(node.state), INF),
        lambda: choose(is_goal(node.state), lambda: Result(node, generated), lambda: search(*add_nodes(frontier, best, generated, serial, next_nodes(node)))),
        lambda: search(frontier, best, generated, serial),
    )


# Create the initial state, then start A*.
def solve():
    bootstrap_kb()
    start = State(START, INITIAL_REMAINING, EMPTY_LOAD)
    node = Node(start, 0, ())
    frontier = []
    serial = push_node(frontier, node, 0)
    return search(frontier, {state_key(start): 0}, (generated_line(node),), serial)
