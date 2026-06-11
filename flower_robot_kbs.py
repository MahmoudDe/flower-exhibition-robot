import sys

from output import main
from utils import choose

# recursion instead of loops.
sys.setrecursionlimit(250000)

# as the main script, run the main
choose(__name__ == "__main__", main, lambda: None)
