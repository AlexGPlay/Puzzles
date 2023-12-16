# Parse input
patterns = []

with open("input.txt") as file:
    parsed_patterns = file.read().split("\n\n")
    for parsed_pattern in parsed_patterns:
        pattern = parsed_pattern.split("\n")
        patterns.append(pattern)


# Util
def vertical_split(pattern, valid_differences):
    rotated_pattern = []
    for i in range(0, len(pattern[0])):
        rotated_pattern.append("".join([pattern[j][i] for j in range(0, len(pattern))]))

    return horizontal_split(rotated_pattern, valid_differences)


def horizontal_split(pattern, valid_differences):
    for i in range(1, len(pattern)):
        first_half = list(reversed(pattern[:i]))
        second_half = pattern[i:]

        if len(first_half) == 0 or len(second_half) == 0:
            continue

        differences = 0
        for k in range(0, min(len(first_half), len(second_half))):
            fh = first_half[k]
            sh = second_half[k]
            for w in range(0, len(fh)):
                if fh[w] != sh[w]:
                    differences += 1

        if differences == valid_differences:
            return i

    return 0


def get_pattern_value(pattern, valid_differences):
    vertical_score = vertical_split(pattern, valid_differences)
    horizontal_score = horizontal_split(pattern, valid_differences)
    return vertical_score + (horizontal_score * 100)


# Part 1 & prepare data for part 2
results = []
for pattern in patterns:
    value = get_pattern_value(pattern, 0)
    results.append(value)
print(sum(results))


# Part 2
part_2_results = []
for pattern in patterns:
    value = get_pattern_value(pattern, 1)
    part_2_results.append(value)
print(sum(part_2_results))
