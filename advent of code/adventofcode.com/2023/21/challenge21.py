import numpy as np
from collections import defaultdict

# Parse input
matrix = []
starting_point = None

with open("input.txt") as file:
    lines = file.readlines()
    for i in range(len(lines)):
        matrix.append([])
        line = lines[i].strip()
        for j in range(len(line)):
            char = line[j]
            matrix[-1].append(char)
            if char == "S":
                starting_point = (i, j)


# Util
def is_rock(i, j):
    return matrix[i][j] == "#"


def is_out_of_bounds(i, j):
    return i < 0 or i >= len(matrix) or j < 0 or j >= len(matrix[i])


def get_movements(i, j):
    possible_movements = []
    for movement in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        if not is_out_of_bounds(i + movement[0], j + movement[1]) and not is_rock(
            i + movement[0], j + movement[1]
        ):
            possible_movements.append((i + movement[0], j + movement[1]))
    return possible_movements


def get_movements_2(i, j):
    possible_movements = []
    for movement in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        new_position = (i + movement[0], j + movement[1])

        if not is_rock(i % len(matrix), j % len(matrix[0])):
            possible_movements.append(new_position)
    return possible_movements


def move_x_times(start_point, times, get_movements_fn=get_movements):
    queue = [start_point]
    next_queue = []

    for _ in range(times):
        while len(queue) > 0:
            i, j = queue.pop()
            new_movements = get_movements_fn(i, j)
            next_queue.extend(new_movements)
        queue = list(set(next_queue))
        next_queue = []
    return len(queue)


# Part 1
movements = 64
final_queue_1 = move_x_times(starting_point, movements)
print(final_queue_1)


# Part 2
def f(n, a):
    b0 = a[0]
    b1 = a[1] - a[0]
    b2 = a[2] - a[1]
    return b0 + b1 * n + (n * (n - 1) // 2) * (b2 - b1)


movements = 26501365
size = len(matrix)
a = [
    3874,  # move_x_times(starting_point, (movements % size) + 0 * 131, get_movements_2),
    34549,  # move_x_times(starting_point, (movements % size) + 1 * 131, get_movements_2),
    95798,  # move_x_times(starting_point, (movements % size) + 2 * 131, get_movements_2)
]
print(f(movements // size, a))
