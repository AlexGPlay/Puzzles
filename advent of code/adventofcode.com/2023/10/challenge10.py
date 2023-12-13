import networkx as nx
from shapely.geometry import Polygon, Point
from shapely.strtree import STRtree

# Parse input
start_node = None
nodes = []
all_matrix_points = []
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
            all_matrix_points.append(Point(i, j))
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
                for connection in connections_to_add:
                    graph.add_edge((i, j), connection)


# Part 1 (Adds info for part 2)
biggest_distance = 0
biggest_distance_node = None
i = 0

for path in nx.single_target_shortest_path_length(graph, start_node):
    length = path[1]
    if length > biggest_distance:
        biggest_distance = length
        biggest_distance_node = path[0]

print(biggest_distance)

# Part 2
side_one = list(nx.all_simple_paths(graph, start_node, biggest_distance_node))[0]
side_two = list(nx.all_simple_paths(graph, biggest_distance_node, start_node))[0]
main_loop_polygon = Polygon(side_one + side_two)

spatial_index = STRtree([main_loop_polygon])

contained_points = [
    point
    for point in all_matrix_points
    if any(main_loop_polygon.contains(point) for _ in spatial_index.query(point))
]

print(len(contained_points))
