from search import solve_astar, solve_dfs
from ui_export import write_solution_data
from utils import numbered_lines


def main():
    astar_result = solve_astar()
    write_solution_data(astar_result)
    print("Search strategy: A* (Experta rules + f(n)=g(n)+h(n))")
    print("Optimal cost:", astar_result.node.g)
    print("UI data file: solution_data.js")
    print("\nSolution path:")
    print(numbered_lines(astar_result.node.path))
    print("Generated search states (sample):")
    print(numbered_lines(astar_result.generated[:40]))
    if len(astar_result.generated) > 40:
        print("... (" + str(len(astar_result.generated)) + " states total)")
    print("\n--- DFS preview (Recency-style expansion order) ---")
    dfs_result = solve_dfs()
    print("DFS cost:", dfs_result.node.g)
    print("DFS path length:", len(dfs_result.node.path))


if __name__ == "__main__":
    main()
