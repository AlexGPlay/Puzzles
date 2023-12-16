import re
import math

movement_pattern = []
nodes = {}

# Parse input
with open("input.txt") as file:
    lines = file.readlines()
    movement_pattern = list(lines[0].strip())

    for line in lines[2:]:
        node = re.match(r"(?P<name>\w+) = \((?P<left>\w+), (?P<right>\w+)\)", line)
        nodes[node.group("name")] = {"L": node.group("left"), "R": node.group("right")}

# Problem 1
current_node = "AAA"
current_movement_index = 0
steps = 0

while current_node != "ZZZ":
    current_movement = movement_pattern[current_movement_index]
    current_movement_index += 1
    if current_movement_index >= len(movement_pattern):
        current_movement_index = 0

    current_node = nodes[current_node][current_movement]

    steps += 1

print(steps)

# Problem 2

all_nodes_are_finished_in_z = False
all_nodes_are_cycles = False
current_movement_index = 0
working_nodes = [
    {"current_node": node, "path": [], "is_cycle": False}
    for node in nodes.keys()
    if node.endswith("A")
]

while not all_nodes_are_finished_in_z and not all_nodes_are_cycles:
    current_movement = movement_pattern[current_movement_index]
    current_movement_index += 1
    if current_movement_index >= len(movement_pattern):
        current_movement_index = 0

    for i in range(len(working_nodes)):
        if working_nodes[i]["is_cycle"]:
            continue

        next_node = nodes[working_nodes[i]["current_node"]][current_movement]
        working_nodes[i]["current_node"] = next_node

        next_100_movements = [
            current_movement,
            *movement_pattern[current_movement_index : current_movement_index + 100],
        ]
        if (next_node, next_100_movements) not in working_nodes[i]["path"]:
            working_nodes[i]["path"].append((next_node, next_100_movements))
        else:
            working_nodes[i]["cycle_starts_at"] = working_nodes[i]["path"].index(
                (next_node, next_100_movements)
            )
            working_nodes[i]["is_cycle"] = True

    all_nodes_are_finished_in_z = all(
        [node["current_node"].endswith("Z") for node in working_nodes]
    )
    all_nodes_are_cycles = all([node["is_cycle"] for node in working_nodes])


result = math.lcm(
    *[len(node["path"]) - node["cycle_starts_at"] for node in working_nodes]
)
print(result)
