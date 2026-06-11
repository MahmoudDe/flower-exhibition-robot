import sys

from run_solver import run

# Experta rule chains and replay builders still use deep recursion.
sys.setrecursionlimit(250000)

if __name__ == "__main__":
    run()
