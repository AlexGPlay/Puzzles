# Parse input
patterns = []

with open("input.txt") as file:
    parsed_patterns = file.read().split("\n\n")
    for parsed_pattern in parsed_patterns:
        pattern = parsed_pattern.split("\n")
        patterns.append(pattern)


# Util
def vertical_split(pattern):
    best_reflect = None
    current_best_difference = 99999999

    for i in range(1, len(pattern[0])):
        first_half = [row[:i] for row in pattern]
        second_half = [row[i:] for row in pattern]

        if len(first_half) == 0 or len(second_half) == 0:
            continue

        # Check that they are mirroring, take into account that they don't need to be the same length
        for i in range(0, min(len(first_half[0]), len(second_half[0]))):
            rotated_first_half = [row[-1 - i] for row in first_half]
            rotated_second_half = [row[i] for row in second_half]

            if rotated_first_half != rotated_second_half:
                break
        else:
            len_diff = abs(len(first_half[0]) - len(second_half[0]))
            if len_diff < current_best_difference:
                current_best_difference = len_diff
                best_reflect = len(first_half[0])

    return best_reflect, current_best_difference


def horizontal_split(pattern):
    best_reflect = None
    current_best_difference = 99999999

    for i in range(1, len(pattern)):
        first_half = pattern[:i]
        second_half = pattern[i:]
        if len(first_half) == 0 or len(second_half) == 0:
            continue

        # Check that they are mirroring, take into account that they don't need to be the same length
        for i in range(0, min(len(first_half), len(second_half))):
            if first_half[-1 - i] != second_half[i]:
                break
        else:
            len_diff = abs(len(first_half) - len(second_half))
            if len_diff < current_best_difference:
                current_best_difference = len_diff
                best_reflect = len(first_half)

    return best_reflect, current_best_difference


def get_pattern_value(pattern):
    vertical_score, biggest_vertical_reflect = vertical_split(pattern)
    horizontal_score, biggest_horizontal_reflect = horizontal_split(pattern)

    if biggest_vertical_reflect < biggest_horizontal_reflect:
        return vertical_score
    else:
        return horizontal_score * 100

    raise "No match found"


# Part 1
results = []
for pattern in patterns:
    results.append(get_pattern_value(pattern))
print(sum(results))
