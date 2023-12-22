import copy

# Parse input
blocks = []

with open("input.txt") as file:
    for line in file.readlines():
        from_coords, to_coords = line.strip().split("~")
        from_x, from_y, from_z = [int(n) for n in from_coords.split(",")]
        to_x, to_y, to_z = [int(n) for n in to_coords.split(",")]
        blocks.append({"from": [from_x, from_y, from_z], "to": [to_x, to_y, to_z]})


# Util
def is_supported(up_block, down_block):
    from1 = up_block["from"]
    to2 = down_block["to"]

    min_z_1 = from1[2]
    min_z_2 = to2[2]
    if min_z_1 != min_z_2 + 1:
        return False

    return can_be_supported(up_block, down_block)


def get_support_blocks(blocks):
    block_1_support_block_2 = {}
    block_2_support_block_1 = {}

    for i in range(len(blocks)):
        test_blocks = blocks[:i]
        for j in range(len(test_blocks)):
            if not is_supported(blocks[i], test_blocks[j]):
                continue

            if i not in block_1_support_block_2:
                block_1_support_block_2[i] = []
            block_1_support_block_2[i].append(j)

            if j not in block_2_support_block_1:
                block_2_support_block_1[j] = []
            block_2_support_block_1[j].append(i)

    return (block_2_support_block_1, block_1_support_block_2)


def can_be_supported(block, potential_block):
    from1 = block["from"]
    to1 = block["to"]

    from2 = potential_block["from"]
    to2 = potential_block["to"]

    return max(from1[0], from2[0]) <= min(to1[0], to2[0]) and max(
        from1[1], from2[1]
    ) <= min(to1[1], to2[1])


def find_closest_z(block, potential_blocks):
    max_z = 1
    for potential_block in potential_blocks:
        if not can_be_supported(block, potential_block):
            continue

        max_z = max(max_z, potential_block["to"][2] + 1)

    return max_z


def simulate(blocks):
    for i in range(len(blocks)):
        block = blocks[i]
        other_blocks = blocks[:i]
        max_z = find_closest_z(block, other_blocks)

        diff = block["from"][2] - max_z
        block["to"][2] -= diff
        block["from"][2] = max_z

    return get_support_blocks(sort_by_z(blocks))


def sort_by_z(blocks):
    return sorted(blocks, key=lambda block: block["from"][2])


# Part 1
part_1_blocks = sort_by_z(copy.deepcopy(blocks))
supports_1, supports_2 = simulate(part_1_blocks)

total = 0

for i in range(len(part_1_blocks)):
    value = part_1_blocks[i]
    is_removable = True
    for j in supports_1.get(i, []):
        if len(supports_2.get(j, [])) == 1:
            is_removable = False
            continue

    if is_removable:
        total += 1

print(total)


# Part 2
def compute_fall(falls_from, supports_1, supports_2):
    check_queue = [
        candidate
        for candidate in supports_1[falls_from]
        if len(supports_2[candidate]) == 1
    ]

    resultset = set()

    while check_queue:
        check = check_queue.pop(0)
        resultset.add(check)
        new_possible_checks = supports_1.get(check, [])
        for possible_check in new_possible_checks:
            possible_check_supports = supports_2.get(possible_check, [])
            if not all(
                [
                    possible_check_support in resultset
                    for possible_check_support in possible_check_supports
                ]
            ):
                continue

            check_queue.append(possible_check)
            check_queue = list(set(check_queue))

    return len(resultset)


part_2_blocks = sort_by_z(copy.deepcopy(blocks))
supports_1, supports_2 = simulate(part_2_blocks)

candidates = set()
for supported in supports_2:
    support = supports_2[supported]
    if len(support) == 1:
        candidates.add(support[0])

s = 0
for candidate in candidates:
    s += compute_fall(candidate, supports_1, supports_2)
print(s)
