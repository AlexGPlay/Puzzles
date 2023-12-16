# Parse input
matrix = []

with open("input.txt") as file:
    lines = file.readlines()
    for line in lines:
        character_list = [c if c != "\\" else "\\" for c in line.strip()]
        matrix.append(character_list)

# Util
REFLECTIONS = {
    "/": {(0, 1): (-1, 0), (0, -1): (1, 0), (1, 0): (0, -1), (-1, 0): (0, 1)},
    "\\": {(0, 1): (1, 0), (0, -1): (-1, 0), (1, 0): (0, 1), (-1, 0): (0, -1)},
}

SPLITTERS = {
    "-": {
        (0, 1): [(0, 1)],
        (0, -1): [(0, -1)],
        (1, 0): [(0, 1), (0, -1)],
        (-1, 0): [(0, 1), (0, -1)],
    },
    "|": {
        (0, 1): [(1, 0), (-1, 0)],
        (0, -1): [(1, 0), (-1, 0)],
        (1, 0): [(1, 0)],
        (-1, 0): [(-1, 0)],
    },
}


def move_ray(light_ray, visited_nodes):
    i, j, direction = light_ray
    next_i, next_j = i, j

    while True:
        next_i, next_j = next_i + direction[0], next_j + direction[1]
        next_node = (next_i, next_j)

        # If already visited we can return
        if next_node in visited_nodes and direction in visited_nodes[next_node]:
            return []
        # if it's out of bounds we can return
        if (
            next_i < 0
            or next_i >= len(matrix)
            or next_j < 0
            or next_j >= len(matrix[0])
        ):
            return []

        char = matrix[next_i][next_j]
        if next_node not in visited_nodes:
            visited_nodes[next_node] = {}
        visited_nodes[next_node] = {direction: True}
        if char in SPLITTERS:
            return [
                (next_i, next_j, new_ray_direction)
                for new_ray_direction in SPLITTERS[char][direction]
            ]
        elif char in REFLECTIONS:
            direction = REFLECTIONS[char][direction]


def execute_initial_ray(light_ray):
    visited_nodes = {}
    light_rays = [light_ray]
    ray_index = 0

    while ray_index < len(light_rays):
        light_ray = light_rays[ray_index]
        new_rays = move_ray(light_ray, visited_nodes)
        light_rays += new_rays
        ray_index += 1

    return len(visited_nodes)


# Part 1
part_1_energized_nodes = execute_initial_ray((0, -1, (0, 1)))
print(part_1_energized_nodes)

# Part 2
part_2_biggest_energized_area = 0
for i in range(0, len(matrix)):
    if i == 0:
        for j in range(0, len(matrix[0])):
            possible_directions = [(1, 0)]
            if j == 0:
                possible_directions.append((0, 1))
            elif j == len(matrix[0]) - 1:
                possible_directions.append((0, -1))
            for direction in possible_directions:
                res = execute_initial_ray((i, j, direction))
                if res > part_2_biggest_energized_area:
                    part_2_biggest_energized_area = res
    elif i == len(matrix) - 1:
        for j in range(0, len(matrix[0])):
            possible_directions = [(-1, 0)]
            if j == 0:
                possible_directions.append((0, 1))
            elif j == len(matrix[0]) - 1:
                possible_directions.append((0, -1))
            for direction in possible_directions:
                res = execute_initial_ray((i, j, direction))
                if res > part_2_biggest_energized_area:
                    part_2_biggest_energized_area = res
    else:
        left_res = execute_initial_ray((i, 0, (0, 1)))
        right_res = execute_initial_ray((i, len(matrix[0]) - 1, (0, -1)))
        if left_res > part_2_biggest_energized_area:
            part_2_biggest_energized_area = left_res
        if right_res > part_2_biggest_energized_area:
            part_2_biggest_energized_area = right_res

print(part_2_biggest_energized_area)
