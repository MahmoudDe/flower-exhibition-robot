import collections
import collections.abc

collections.Mapping = collections.abc.Mapping

from experta import Fact


class Grid(Fact):
    pass


class Warehouse(Fact):
    pass


class Robot(Fact):
    pass


class Pavilion(Fact):
    pass


class Need(Fact):
    pass


class LoadBatch(Fact):
    pass


class Violation(Fact):
    pass


class Goal(Fact):
    pass


class CurrentState(Fact):
    pass


class GeneratedState(Fact):
    pass


class TreeLine(Fact):
    pass


class Solution(Fact):
    pass


class SearchConfig(Fact):
    pass


class AmountTuple(Fact):
    """Integer amounts aligned with delivery lines (comma-separated)."""
    pass


class TextTuple(Fact):
    """Text values aligned with delivery lines (pipe-separated)."""
    pass


class PositionTuple(Fact):
    """Grid positions aligned with delivery lines (pipe-separated x,y pairs)."""
    pass


class RobotCapacity(Fact):
    pass


class SearchLimit(Fact):
    pass


class DeliveryTarget(Fact):
    pass


class DeliveryLine(Fact):
    pass
