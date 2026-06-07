import sys

from output import main
from utils import choose

# Recursion is used instead of explicit loop syntax.
sys.setrecursionlimit(200000)

# Run the console program only as the main script.
choose(__name__ == "__main__", main, lambda: None)
