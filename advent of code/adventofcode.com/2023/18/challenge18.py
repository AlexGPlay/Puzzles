import re
import math

# Parse input
dig_plan = []

with open("input.txt") as file:
    for line in file:
        match = re.search(
            r"(?P<direction>[A-Z]) (?P<quantity>\d+) \((?P<color>.*)\)", line
        )
        dig_plan.append(
            {
                "direction": match.group("direction"),
                "quantity": int(match.group("quantity")),
                "color": match.group("color"),
            }
        )

# Util
DIRECTIONS = {
    "R": (0, 1),
    "L": (0, -1),
    "D": (1, 0),
    "U": (-1, 0),
}


def calculate_polygon_area(vertices):
    n = len(vertices)

    area = 0.0

    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1

    area = abs(area) / 2.0

    return area


def calculate_polygon(vertices, perimeter):
    return calculate_polygon_area(vertices) + perimeter // 2 + 1


# Part 1
vertices_1 = [(0, 0)]
perimeter_1 = 0


for step in dig_plan:
    direction = DIRECTIONS[step["direction"]]
    perimeter_1 += step["quantity"]
    vertices_1.append(
        (
            vertices_1[-1][0] + direction[0] * step["quantity"],
            vertices_1[-1][1] + direction[1] * step["quantity"],
        )
    )

print(calculate_polygon(vertices_1, perimeter_1))

# Part 2
ENCODED_DIRECTIONS = {"0": "R", "1": "D", "2": "L", "3": "U"}

vertices_2 = [(0, 0)]
perimeter_2 = 0


for step in dig_plan:
    distance = int(step["color"][1:6], 16)
    direction = DIRECTIONS[ENCODED_DIRECTIONS[step["color"][-1]]]

    perimeter_2 += distance
    vertices_2.append(
        (
            vertices_2[-1][0] + direction[0] * distance,
            vertices_2[-1][1] + direction[1] * distance,
        )
    )

print(calculate_polygon(vertices_2, perimeter_2))
