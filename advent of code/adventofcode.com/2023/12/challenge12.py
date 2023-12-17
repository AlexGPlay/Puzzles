from functools import cache
import re

# Parse input
springs = []

with open("input.txt") as file:
    for line in file.readlines():
        spring_conditions, codification = line.strip().split(" ")
        springs.append(
            {
                "spring_conditions": spring_conditions,
                "codification": [int(n) for n in codification.split(",")],
            }
        )


# Util
@cache
def backtrack_fill(springs, codification):
    if len(codification) == 0:
        if "#" not in springs:
            return 1
        return 0

    if len(springs) < sum(codification):
        return 0

    if springs == "":
        return 0

    if springs[0] == ".":
        return backtrack_fill(springs[1:], codification)
    if springs[0] == "#":
        full_group = re.findall(r"#+", springs)[0]
        current_constrain = codification[0]
        substr = springs[0:current_constrain]

        if full_group != substr:
            if "?" in substr and "." not in substr:
                if (
                    current_constrain < len(springs)
                    and springs[current_constrain] == "?"
                ):
                    return backtrack_fill(
                        springs[current_constrain + 1 :], codification[1:]
                    )
                if (
                    current_constrain < len(springs)
                    and springs[current_constrain] == "#"
                ):
                    return 0
                return backtrack_fill(springs[current_constrain:], codification[1:])
            return 0
        if full_group == substr and len(substr) != current_constrain:
            return 0
        if full_group == substr and len(substr) == current_constrain:
            if current_constrain == len(springs):
                return backtrack_fill("", codification[1:])
            if springs[current_constrain] == ".":
                return backtrack_fill(
                    springs[current_constrain + 1 :], codification[1:]
                )
            elif springs[current_constrain] == "?":
                return backtrack_fill(
                    springs[current_constrain + 1 :], codification[1:]
                )
        raise "Error"

    valid_subs = backtrack_fill(
        "#" + springs[1:],
        codification,
    ) + backtrack_fill(
        springs[1:],
        codification,
    )
    return valid_subs


# Part 1
total = 0
for spring in springs:
    valid_springs = backtrack_fill(
        spring["spring_conditions"], tuple(spring["codification"])
    )
    total += valid_springs

print(total)

# Part 2
total = 0
for spring in springs:
    condition = "?".join(
        [
            spring["spring_conditions"],
            spring["spring_conditions"],
            spring["spring_conditions"],
            spring["spring_conditions"],
            spring["spring_conditions"],
        ]
    )

    valid_springs = backtrack_fill(condition, tuple(spring["codification"] * 5))
    total += valid_springs

print(total)
