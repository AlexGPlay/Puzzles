# Parse input
matrix = []
with open("example.txt") as file:
    for line in file.readlines():
        matrix.append(list(line.strip()))

# Utils
SLOPES = {"^": (-1, 0), ">": (0, 1), "v": (1, 0), "<": (0, -1)}


def get_valid_paths(matrix, current, use_slope=True):
    valid_paths = []

    for direction in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        new_position = (current[0] + direction[0], current[1] + direction[1])
        # Check that is contained in matrix
        if new_position[0] < 0 or new_position[0] >= len(matrix):
            continue
        if new_position[1] < 0 or new_position[1] >= len(matrix[0]):
            continue

        # Check that is not a wall
        if matrix[new_position[0]][new_position[1]] == "#":
            continue

        # In case of being a slope check that the direction matches
        if use_slope:
            if matrix[new_position[0]][new_position[1]] in SLOPES:
                if direction != SLOPES[matrix[new_position[0]][new_position[1]]]:
                    continue

        valid_paths.append(new_position)

    return valid_paths


def biggest_path(matrix, start, end, *, use_slope=True):
    queue = [(start, [start])]
    distances = {}

    while len(queue) > 0:
        current, path = queue.pop(0)
        if len(path) - 1 < distances.get(current, 0):
            continue

        distances[current] = len(path) - 1

        possible_paths = get_valid_paths(matrix, current, use_slope)

        for new_position in possible_paths:
            if new_position in path:
                continue

            queue.append((new_position, [*path, new_position]))

    return distances[end]


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
max_d_1 = biggest_path(matrix, start_from, end_at, use_slope=True)
print(max_d_1)

# Part 2
max_d_2 = biggest_path(matrix, start_from, end_at, use_slope=False)
print(max_d_2)
