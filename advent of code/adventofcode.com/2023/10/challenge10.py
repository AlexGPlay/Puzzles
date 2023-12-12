import networkx as nx

# Parse input
start_node = None
nodes = []
graph = nx.Graph()

NORTH_PIPES = {"direction": [-1, 0], "pipes": ["|", "7", "F"]}
SOUTH_PIPES = {"direction": [1, 0], "pipes": ["|", "L", "J"]}
WEST_PIPES = {"direction": [0, -1], "pipes": ["-", "L", "F"]}
EAST_PIPES = {"direction": [0, 1], "pipes": ["-", "7", "J"]}

CONNECTIONS = {
    "|": [NORTH_PIPES, SOUTH_PIPES],
    "-": [EAST_PIPES, WEST_PIPES],
    "L": [NORTH_PIPES, EAST_PIPES],
    "J": [NORTH_PIPES, WEST_PIPES],
    "7": [SOUTH_PIPES, WEST_PIPES],
    "F": [SOUTH_PIPES, EAST_PIPES],
    "S": [NORTH_PIPES, SOUTH_PIPES, EAST_PIPES, WEST_PIPES],
}

with open("input.txt") as file:
    lines = [line.strip() for line in file.readlines()]
    for i in range(len(lines)):
        for j in range(len(lines[i])):
            char = lines[i][j]
            if char not in CONNECTIONS:
                continue

            char_connections = CONNECTIONS[char]
            connections_to_add = []
            for connection in char_connections:
                direction = connection["direction"]
                valid_pipes = connection["pipes"]

                check_i = i + direction[0]
                check_j = j + direction[1]
                if check_i < 0 or check_i >= len(lines):
                    continue
                if check_j < 0 or check_j >= len(lines[check_i]):
                    continue

                check_pipe = lines[check_i][check_j]
                if check_pipe in valid_pipes:
                    connections_to_add.append((check_i, check_j))

            if char == "S":
                start_node = (i, j)

            if len(connections_to_add) == 2:
                nodes.append((i, j))
                for connection in connections_to_add:
                    graph.add_edge((i, j), connection)


# Part 1
biggest_distance = 0
i = 0

for path in nx.single_target_shortest_path_length(graph, start_node):
    length = path[1]
    if length > biggest_distance:
        biggest_distance = length

print(biggest_distance)

# Part 2
