import re

# Parse input
springs = []

with open("example.txt") as file:
    for line in file.readlines():
        spring_conditions, codification = line.strip().split(" ")
        springs.append(
            {
                "spring_conditions": spring_conditions,
                "codification": [int(n) for n in codification.split(",")],
            }
        )

# Util
subs = ["#", "."]


def backtrack_fill(springs, codification):
    is_all_filled = "?" not in springs
    if is_all_filled:
        groups = re.findall(r"#+", springs)
        are_same_length = len(groups) == len(codification)
        if not are_same_length:
            return []
        for group, cod in zip(groups, codification):
            if len(group) != cod:
                return []
        return [springs]

    filled_area = springs[: springs.index("?")]
    groups = re.findall(r"#+", filled_area)
    comparable_codifications = codification[: len(groups)]
    for group, cod in zip(groups, comparable_codifications):
        if len(group) > cod:
            return []

    first_question_mark = springs.index("?")
    valid_subs = []
    for sub in subs:
        list_spring = list(springs)
        list_spring[first_question_mark] = sub
        backtracked_valid_subs = backtrack_fill("".join(list_spring), codification)
        valid_subs.extend(backtracked_valid_subs)

    return valid_subs


# Part 1
sum = 0
for spring in springs:
    valid_springs = backtrack_fill(spring["spring_conditions"], spring["codification"])
    sum += len(valid_springs)

print(sum)
