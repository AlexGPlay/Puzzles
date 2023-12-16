# Parse input
rocks = []
matrix = []

with open("input.txt") as file:
    lines = file.readlines()
    for i in range(0, len(lines)):
        matrix.append([])
        line = lines[i].strip()
        for j in range(0, len(line)):
            char = line[j]
            matrix[-1].append(char)
            if char == "O":
                rocks.append((i, j))


# Util
def tilt_rocks_north(matrix):
    for j in range(0, len(matrix[0])):
        column_stop = 0
        for i in range(0, len(matrix)):
            if matrix[i][j] == "O":
                if i != column_stop:
                    matrix[i][j] = "."
                    matrix[column_stop][j] = "O"

                column_stop += 1
            elif matrix[i][j] == "#":
                column_stop = i + 1


def tilt_rocks_west(matrix):
    for i in range(0, len(matrix)):
        row_stop = 0
        for j in range(0, len(matrix[0])):
            if matrix[i][j] == "O":
                if j != row_stop:
                    matrix[i][j] = "."
                    matrix[i][row_stop] = "O"

                row_stop += 1
            elif matrix[i][j] == "#":
                row_stop = j + 1


def tilt_rocks_south(matrix):
    for j in range(0, len(matrix[0])):
        column_stop = len(matrix) - 1
        for i in range(len(matrix) - 1, -1, -1):
            if matrix[i][j] == "O":
                if i != column_stop:
                    matrix[i][j] = "."
                    matrix[column_stop][j] = "O"

                column_stop -= 1
            elif matrix[i][j] == "#":
                column_stop = i - 1


def tilt_rocks_east(matrix):
    for i in range(0, len(matrix)):
        row_stop = len(matrix[0]) - 1
        for j in range(len(matrix[0]) - 1, -1, -1):
            if matrix[i][j] == "O":
                if j != row_stop:
                    matrix[i][j] = "."
                    matrix[i][row_stop] = "O"

                row_stop -= 1
            elif matrix[i][j] == "#":
                row_stop = j - 1


def count_north_load(matrix):
    total_load = 0
    for i in range(0, len(matrix)):
        for j in range(0, len(matrix[0])):
            if matrix[i][j] == "O":
                total_load += len(matrix) - i

    return total_load


# Part 1
updated_matrix = [row.copy() for row in matrix]
tilt_rocks_north(updated_matrix)
total_load = count_north_load(updated_matrix)
print(total_load)

# Part 2
updated_matrix_part_2 = [row.copy() for row in matrix]
cycles = 1000000000

tilted_statuses = []


def are_same_matrix(matrix_1, matrix_2):
    for i in range(0, len(matrix_1)):
        for j in range(0, len(matrix_1[0])):
            if matrix_1[i][j] != matrix_2[i][j]:
                return False

    return True


def is_matrix_contained(matrix, matrix_list):
    for i in range(0, len(matrix_list)):
        if are_same_matrix(matrix, matrix_list[i]):
            return i

    return -1


repetition_index = -1
for i in range(0, cycles):
    tilt_rocks_north(updated_matrix_part_2)
    tilt_rocks_west(updated_matrix_part_2)
    tilt_rocks_south(updated_matrix_part_2)
    tilt_rocks_east(updated_matrix_part_2)

    contained_index = is_matrix_contained(updated_matrix_part_2, tilted_statuses)
    if contained_index != -1:
        repetition_index = contained_index
        break

    tilted_statuses.append([row.copy() for row in updated_matrix_part_2])

cycle_index = (cycles - repetition_index - 1) % (
    len(tilted_statuses) - repetition_index
)

total_load_2 = count_north_load(tilted_statuses[cycle_index + repetition_index])
print(total_load_2)
