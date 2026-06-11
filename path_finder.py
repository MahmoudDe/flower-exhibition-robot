import heapq
import sys

from cost_estimate import estimate_remaining_cost
from flower_problem import EMPTY_CARGO, INITIAL_REMAINING, ITEM_POSITIONS, NO_COST, ROBOT_START, RobotState, SearchNode, SearchResult
from helpers import is_empty
from robot_rules import generate_next_states, text_to_amounts, text_to_path

SAMPLE_STATE_LIMIT = 40
PROGRESS_EVERY = 500


def make_state_key(x, y, remaining, cargo):
    return (x, y, remaining, cargo)


def format_search_line(x, y, remaining, cargo, cost):
    estimated = estimate_remaining_cost((x, y), remaining, cargo, ITEM_POSITIONS)
    return (
        "g="
        + str(cost)
        + " h="
        + str(estimated)
        + " f="
        + str(cost + estimated)
        + " pos=("
        + str(x)
        + ", "
        + str(y)
        + ") cargo="
        + str(cargo)
        + " remaining="
        + str(remaining)
    )


def get_fact_value(fact, name):
    return fact[name]


def fact_to_search_node(fact):
    remaining = text_to_amounts(get_fact_value(fact, "remaining"))
    cargo = text_to_amounts(get_fact_value(fact, "cargo"))
    state = RobotState((get_fact_value(fact, "x"), get_fact_value(fact, "y")), remaining, cargo)
    return SearchNode(state, get_fact_value(fact, "g"), text_to_path(get_fact_value(fact, "path")))


def make_frontier_entry(fact, order):
    return (get_fact_value(fact, "f"), order, fact)


def remember_generated(sample, total, line):
    if len(sample) < SAMPLE_STATE_LIMIT:
        sample.append(line)
    return total + 1


def is_goal_state(fact):
    remaining = text_to_amounts(get_fact_value(fact, "remaining"))
    cargo = text_to_amounts(get_fact_value(fact, "cargo"))
    return is_empty(remaining) and is_empty(cargo)


def make_start_state():
    x, y = ROBOT_START
    estimated = estimate_remaining_cost((x, y), INITIAL_REMAINING, EMPTY_CARGO, ITEM_POSITIONS)
    return {
        "x": x,
        "y": y,
        "remaining": ",".join(map(str, INITIAL_REMAINING)),
        "cargo": ",".join(map(str, EMPTY_CARGO)),
        "g": 0,
        "h": estimated,
        "f": estimated,
        "path": "",
        "action": "start",
    }


def add_next_states_to_frontier(frontier, best_costs, sample, total, order, facts, mode):
    for fact in facts:
        remaining = text_to_amounts(get_fact_value(fact, "remaining"))
        cargo = text_to_amounts(get_fact_value(fact, "cargo"))
        key = make_state_key(get_fact_value(fact, "x"), get_fact_value(fact, "y"), remaining, cargo)
        cost = get_fact_value(fact, "g")
        if cost >= best_costs.get(key, NO_COST):
            continue
        best_costs[key] = cost
        entry = make_frontier_entry(fact, order)
        order += 1
        if mode == "depth_first":
            frontier.append(entry)
        else:
            heapq.heappush(frontier, entry)
        line = format_search_line(get_fact_value(fact, "x"), get_fact_value(fact, "y"), remaining, cargo, cost)
        total = remember_generated(sample, total, line)
    return frontier, best_costs, sample, total, order


def take_next_state(frontier, mode):
    if mode == "depth_first":
        _, _, fact = frontier.pop()
    else:
        _, _, fact = heapq.heappop(frontier)
    return fact


def run_search(mode="astar", progress=sys.stderr):
    start_state = make_start_state()
    x = start_state["x"]
    y = start_state["y"]
    frontier = []
    order = 0
    entry = make_frontier_entry(start_state, order)
    order += 1
    if mode == "depth_first":
        frontier.append(entry)
    else:
        heapq.heappush(frontier, entry)

    best_costs = {make_state_key(x, y, INITIAL_REMAINING, EMPTY_CARGO): 0}
    generated_sample = [format_search_line(x, y, INITIAL_REMAINING, EMPTY_CARGO, 0)]
    generated_total = 1
    expansions = 0

    while frontier:
        fact = take_next_state(frontier, mode)
        key = make_state_key(
            get_fact_value(fact, "x"),
            get_fact_value(fact, "y"),
            text_to_amounts(get_fact_value(fact, "remaining")),
            text_to_amounts(get_fact_value(fact, "cargo")),
        )
        if get_fact_value(fact, "g") != best_costs.get(key, NO_COST):
            continue

        expansions += 1
        if progress and expansions % PROGRESS_EVERY == 0:
            print(
                "  ... explored " + str(expansions) + " states (" + str(generated_total) + " generated)",
                file=progress,
                flush=True,
            )

        if is_goal_state(fact):
            return SearchResult(fact_to_search_node(fact), tuple(generated_sample), generated_total)

        remaining = text_to_amounts(get_fact_value(fact, "remaining"))
        cargo = text_to_amounts(get_fact_value(fact, "cargo"))
        path = text_to_path(get_fact_value(fact, "path"))
        next_states = generate_next_states(
            get_fact_value(fact, "x"),
            get_fact_value(fact, "y"),
            remaining,
            cargo,
            get_fact_value(fact, "g"),
            path,
        )
        frontier, best_costs, generated_sample, generated_total, order = add_next_states_to_frontier(
            frontier,
            best_costs,
            generated_sample,
            generated_total,
            order,
            next_states,
            mode,
        )

    return None


def find_path(mode="astar", progress=sys.stderr):
    result = run_search(mode, progress=progress)
    if result is None:
        raise RuntimeError("No solution found for mode=" + mode)
    return result


def find_best_path(progress=sys.stderr):
    return find_path("astar", progress=progress)


def find_path_depth_first(progress=sys.stderr):
    return find_path("depth_first", progress=progress)
