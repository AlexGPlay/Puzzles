space = []
galaxies = []

with open("input.txt") as file:
    lines = file.readlines()

    for i in range(0, len(lines)):
        line = lines[i].strip()
        space.append([])
        for j in range(0, len(line)):
            space[i].append(line[j])
            if lines[i][j] == "#":
                galaxies.append((i, j))


# Utils
def expand_galaxies(expand_size):
    expanded_galaxies = galaxies.copy()
    for i in range(0, len(space)):
        if "#" in space[i]:
            continue

        for j in range(0, len(expanded_galaxies)):
            if galaxies[j][0] > i:
                galaxy = expanded_galaxies[j]
                expanded_galaxies[j] = (galaxy[0] + expand_size, galaxy[1])

    for i in range(0, len(space[0])):
        column = [row[i] for row in space]
        if "#" in column:
            continue

        for j in range(0, len(expanded_galaxies)):
            if galaxies[j][1] > i:
                galaxy = expanded_galaxies[j]
                expanded_galaxies[j] = (galaxy[0], galaxy[1] + expand_size)

    return expanded_galaxies


def calculate_distances(expanded_galaxies):
    distances = {}

    for i in range(0, len(expanded_galaxies)):
        from_galaxy = expanded_galaxies[i]

        for j in range(0, len(expanded_galaxies)):
            to_galaxy = expanded_galaxies[j]
            if i == j:
                continue

            key = (from_galaxy, to_galaxy)
            if key in distances or (to_galaxy, from_galaxy) in distances:
                continue

            distance = abs(from_galaxy[0] - to_galaxy[0]) + abs(
                from_galaxy[1] - to_galaxy[1]
            )

            distances[key] = distance

    return sum(distances.values())


# Part 1
expanded_galaxies_part_1 = expand_galaxies(1)
sum_part_1 = calculate_distances(expanded_galaxies_part_1)
print(sum_part_1)

# Part 2
expanded_galaxies_part_2 = expand_galaxies(1000000 - 1)
sum_part_2 = calculate_distances(expanded_galaxies_part_2)
print(sum_part_2)
