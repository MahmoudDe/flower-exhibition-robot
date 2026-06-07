from search import solve
from ui_export import write_solution_data
from utils import numbered_lines


# Console output layer: solve, then print cost, path, and generated states.
def main():
    result = solve()
    write_solution_data(result)
    print("Optimal cost:", result.node.g)
    print("UI data file: solution_data.js")
    print("\nSolution path:")
    print(numbered_lines(result.node.path))
    print("Generated search states:")
    print(numbered_lines(result.generated))
