import numpy as np

# Parse input
hailstones = []

with open("input.txt") as file:
    for line in file.read().splitlines():
        coords, velocity = line.split(" @ ")
        x, y, z = [int(n) for n in coords.split(", ")]
        vx, vy, vz = [int(n) for n in velocity.split(", ")]
        hailstones.append({"position": [x, y, z], "velocity": [vx, vy, vz]})


# Util
def line_equation(a, b, t):
    return a + t * b


def find_intersection_point(line1, line2):
    A = np.array(
        [
            [line1["velocity"][0], -line2["velocity"][0]],
            [line1["velocity"][1], -line2["velocity"][1]],
        ]
    )

    B = np.array(
        [
            line2["position"][0] - line1["position"][0],
            line2["position"][1] - line1["position"][1],
        ]
    )

    # Solve the system of linear equations
    try:
        p1 = np.array([line1["position"][0], line1["position"][1]])
        v1 = np.array([line1["velocity"][0], line1["velocity"][1]])

        intersection = np.linalg.solve(A, B)

        if all(t >= 0 for t in intersection):
            intersection = p1 + v1 * intersection[0]
            return intersection
        else:
            # Intersection is in the past
            return None
    except np.linalg.LinAlgError:
        # Lines are parallel, no intersection
        return None


def find_intersections_in_area(lines, max_area, min_area):
    valid_intersections = []

    for i in range(len(lines)):
        for j in range(i + 1, len(lines)):
            intersection_point = find_intersection_point(lines[i], lines[j])
            if intersection_point is None:
                continue

            x, y = intersection_point[0], intersection_point[1]
            if x > max_area or x < min_area or y > max_area or y < min_area:
                continue

            valid_intersections.append((lines[i], lines[j], intersection_point))

    return valid_intersections


# Part 1
intersections = find_intersections_in_area(hailstones, 400000000000000, 200000000000000)
print(len(intersections))
