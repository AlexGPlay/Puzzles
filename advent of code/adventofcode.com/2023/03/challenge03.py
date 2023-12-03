import re

board = []
numbers = {}

# Parse input
with open('input.txt') as file:
    lines = file.readlines()

    # Parse lines into an array so it's easier to check adjacent cells
    for i in range(len(lines)):
        line = lines[i]
        board.append(list(line.strip()))
        detected_numbers = re.finditer(r'\d+', line) or []

        for match in detected_numbers:
            number = match.group(0)
            if not numbers.get(number):
                numbers[number] = []

            numbers[number].append({ "i": i, "from_j": match.start(), "to_j": match.end() - 1 })

# Util functions
def is_part_of_board(i, j):
    return 0 <= i < len(board) and 0 <= j < len(board[i])

def check_left(dict_number, symbol_fn):
    i = dict_number["i"]
    j = dict_number["from_j"] - 1
    if not is_part_of_board(i, j):
        return None
    if symbol_fn(i, j):
        return i, j
    return None

def check_right(dict_number, symbol_fn):
    i = dict_number["i"]
    j = dict_number["to_j"] + 1
    if not is_part_of_board(i, j):
        return None
    if symbol_fn(i, j):
        return i, j
    return None

def check_bottom(dict_number, symbol_fn):
    i = dict_number["i"] + 1

    if not is_part_of_board(i, 0):
        return None

    from_j = max(dict_number["from_j"] - 1, 0)
    to_j = min(dict_number["to_j"] + 1, len(board[i]) - 1)
    for j in range(from_j, to_j + 1):
        if symbol_fn(i, j):
            return i, j
    return None

def check_top(dict_number, symbol_fn):
    i = dict_number["i"] - 1

    if not is_part_of_board(i, 0):
        return None

    from_j = max(dict_number["from_j"] - 1, 0)
    to_j = min(dict_number["to_j"] + 1, len(board[i]) - 1)
    for j in range(from_j, to_j + 1):
        if symbol_fn(i, j):
            return i, j
    return None

# Part 1 solution
def is_valid_symbol(i, j):
    return not board[i][j].isalnum() and board[i][j] != "."

def check_number(number):
    return check_left(number, is_valid_symbol) or check_right(number, is_valid_symbol) or check_bottom(number, is_valid_symbol) or check_top(number, is_valid_symbol)

adjacent_numbers = []
for number in numbers:
    for i in range(len(numbers[number])):
        if check_number(numbers[number][i]):
            adjacent_numbers.append(int(number))

print(sum(adjacent_numbers))

# Part 2 solution
def is_asterisk(i, j):
    return board[i][j] == '*'

def check_asterisk_number(number):
    return check_left(number, is_asterisk) or check_right(number, is_asterisk) or check_bottom(number, is_asterisk) or check_top(number, is_asterisk)

numbers_adjacent_to_asterisk = {}
for number in numbers:
    for i in range(len(numbers[number])):
        asterisk_position = check_asterisk_number(numbers[number][i])
        if asterisk_position:
            if not numbers_adjacent_to_asterisk.get(asterisk_position):
                numbers_adjacent_to_asterisk[asterisk_position] = []

            numbers_adjacent_to_asterisk[asterisk_position].append(int(number))

result = 0
for asterisk in numbers_adjacent_to_asterisk:
    if len(numbers_adjacent_to_asterisk[asterisk]) == 2:
        result += numbers_adjacent_to_asterisk[asterisk][0] * numbers_adjacent_to_asterisk[asterisk][1]

print(result)