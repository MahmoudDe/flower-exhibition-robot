# Backward-compatible entry point. Prefer: python main.py
from run_solver import run

if __name__ == "__main__":
    import sys

    sys.setrecursionlimit(250000)
    run()
