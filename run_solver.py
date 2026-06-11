import sys

from export_for_ui import save_visualizer_data
from flower_problem import DATA_FILE
from helpers import format_numbered_list
from path_finder import find_best_path, find_path_depth_first


def run():
    print("Scenario:", DATA_FILE)
    print("Running A* search (Experta rules + f(n)=g(n)+h(n))...")
    best_path = find_best_path(progress=sys.stderr)

    print("Running depth-first search...")
    depth_first_path = find_path_depth_first(progress=sys.stderr)

    save_visualizer_data(best_path, depth_first_path)

    print("Search strategy: A* (Experta rules + f(n)=g(n)+h(n))")
    print("Optimal cost:", best_path.node.cost)
    print("UI data file: solution_data.js")
    print("\nSolution path:")
    print(format_numbered_list(best_path.node.path))
    print("Generated search states (sample):")
    print(format_numbered_list(best_path.generated_sample))
    if best_path.generated_total > len(best_path.generated_sample):
        print("... (" + str(best_path.generated_total) + " states total)")
    print("\n--- DFS (depth-first) ---")
    print("DFS cost:", depth_first_path.node.cost)
    print("DFS path length:", len(depth_first_path.node.path))


if __name__ == "__main__":
    run()
