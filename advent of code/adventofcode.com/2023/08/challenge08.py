import re

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
steps = 0
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

        if (next_node, current_movement) not in working_nodes[i]["path"]:
            working_nodes[i]["path"].append((next_node, current_movement))
        else:
            working_nodes[i]["is_cycle"] = True

    all_nodes_are_finished_in_z = all(
        [node["current_node"].endswith("Z") for node in working_nodes]
    )
    all_nodes_are_cycles = all([node["is_cycle"] for node in working_nodes])

    steps += 1

print(steps)
