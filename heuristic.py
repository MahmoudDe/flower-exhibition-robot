from domain import WAREHOUSE
from utils import all_zero, choose


def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def cargo_positions(cargo, positions):
    match cargo, positions:
        case (), ():
            return ()
        case (amount, *ar), (pos, *pr):
            return choose(amount > 0, lambda: (pos,) + cargo_positions(tuple(ar), tuple(pr)), lambda: cargo_positions(tuple(ar), tuple(pr)))


def min_or_zero(values):
    return choose(len(values) > 0, lambda: min(values), lambda: 0)


def heuristic(pos, remaining, cargo, item_positions):
    return choose(
        all_zero(cargo),
        lambda: choose(all_zero(remaining), lambda: 0, lambda: manhattan(pos, WAREHOUSE)),
        lambda: min_or_zero(tuple(map(lambda p: manhattan(pos, p), cargo_positions(cargo, item_positions)))),
    )
