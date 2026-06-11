from flower_problem import WAREHOUSE
from helpers import is_empty


def grid_distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def delivery_positions(cargo, positions):
    stops = ()
    for amount, pos in zip(cargo, positions):
        if amount > 0:
            stops = stops + (pos,)
    return stops


def nearest_distance(pos, positions):
    return min(grid_distance(pos, stop) for stop in positions) if positions else 0


def estimate_remaining_cost(pos, remaining, cargo, item_positions):
    if is_empty(cargo):
        if is_empty(remaining):
            return 0
        return grid_distance(pos, WAREHOUSE)
    return nearest_distance(pos, delivery_positions(cargo, item_positions))
