# Parse input
matrix = []
with open("input.txt") as file:
    for line in file.readlines():
        matrix.append(list(line.strip()))

# Utils
SLOPES = {"^": (-1, 0), ">": (0, 1), "v": (1, 0), "<": (0, -1)}


def is_in_matrix(position):
    if position[0] < 0 or position[0] >= len(matrix):
        return False
    if position[1] < 0 or position[1] >= len(matrix[0]):
        return False
    return True


def count_intersection_size(matrix, position):
    intersection_size = 0
    for direction in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        new_position = (position[0] + direction[0], position[1] + direction[1])
        if not is_in_matrix(new_position):
            continue

        if matrix[new_position[0]][new_position[1]] == "#":
            continue
        intersection_size += 1
    return intersection_size


def build_pois(matrix, start, end):
    pois = [start, end]

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if matrix[i][j] == "#":
                continue
            intersection_size = count_intersection_size(matrix, (i, j))
            if intersection_size > 2:
                pois.append((i, j))

    return pois


def expand_poi(matrix, selected_poi, pois, use_slope):
    distances = {}
    queue = [(selected_poi, [selected_poi])]

    while queue:
        point, path = queue.pop(0)
        if point in pois and point != selected_poi:
            distances[point] = len(path) - 1
            continue

        for direction in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            new_position = (point[0] + direction[0], point[1] + direction[1])
            if not is_in_matrix(new_position):
                continue

            if matrix[new_position[0]][new_position[1]] == "#":
                continue

            if new_position in path:
                continue

            if use_slope:
                if matrix[new_position[0]][new_position[1]] in SLOPES:
                    if direction != SLOPES[matrix[new_position[0]][new_position[1]]]:
                        continue

            new_path = []
            new_path.extend(path)
            new_path.append(new_position)
            queue.append((new_position, new_path))

    return distances


def create_graph(matrix, start, end, use_slope):
    pois = build_pois(matrix, start, end)
    distances = {}

    for poi in pois:
        distances[poi] = expand_poi(matrix, poi, pois, use_slope)

    return distances


seen = set()


def dfs_longest_path(graph, node, end):
    if node == end:
        return 0

    distance = float("-inf")
    seen.add(node)

    for neighbor, weight in graph[node].items():
        if neighbor in seen:
            continue

        distance = max(distance, dfs_longest_path(graph, neighbor, end) + weight)

    seen.remove(node)

    return distance


def find_open_top(matrix):
    i = 0
    for j in range(len(matrix[0])):
        if matrix[i][j] == ".":
            return (i, j)

    raise Exception("No open top found")


def find_open_bottom(matrix):
    i = len(matrix) - 1
    for j in range(len(matrix[0])):
        if matrix[i][j] == ".":
            return (i, j)

    raise Exception("No open bottom found")


start_from = find_open_top(matrix)
end_at = find_open_bottom(matrix)

# Part 1
sloped_graph = create_graph(matrix, start_from, end_at, use_slope=True)
biggest_path_1 = dfs_longest_path(sloped_graph, start_from, end_at)
print(biggest_path_1)

# Part 2
unsloped_graph = create_graph(matrix, start_from, end_at, use_slope=False)
biggest_path_2 = dfs_longest_path(unsloped_graph, start_from, end_at)
print(biggest_path_2)
