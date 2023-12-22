import heapq

matrix = []
with open("input.txt") as file:
    for line in file.readlines():
        matrix.append([int(n) for n in list(line.strip())])


# Util
def is_in_matrix(matrix, node):
    return 0 <= node[0] < len(matrix) and 0 <= node[1] < len(matrix[0])


# Part 1
def dijkstra_part_1(graph, start, end):
    seen = set()

    priority_queue = [start]

    while priority_queue:
        weight, position, direction, velocity = heapq.heappop(priority_queue)

        if position == end:
            return weight

        if (position, direction, velocity) in seen:
            continue

        seen.add((position, direction, velocity))

        if velocity < 3 and direction != (0, 0):
            new_position = (position[0] + direction[0], position[1] + direction[1])
            if is_in_matrix(graph, new_position):
                new_weight = weight + graph[new_position[0]][new_position[1]]
                heapq.heappush(
                    priority_queue, (new_weight, new_position, direction, velocity + 1)
                )

        for new_direction in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            if new_direction == direction:
                continue

            if new_direction == (-direction[0], -direction[1]):
                continue

            new_position = (
                position[0] + new_direction[0],
                position[1] + new_direction[1],
            )
            if not is_in_matrix(graph, new_position):
                continue

            new_weight = weight + graph[new_position[0]][new_position[1]]
            heapq.heappush(priority_queue, (new_weight, new_position, new_direction, 1))

    return -1


weight = dijkstra_part_1(
    matrix, (0, (0, 0), (0, 0), 0), (len(matrix) - 1, len(matrix[0]) - 1)
)
print(weight)


# Part 2
def dijkstra_part_2(graph, start, end):
    seen = set()

    priority_queue = [start]

    while priority_queue:
        weight, position, direction, velocity = heapq.heappop(priority_queue)

        if position == end and velocity >= 4:
            return weight

        if (position, direction, velocity) in seen:
            continue

        seen.add((position, direction, velocity))

        if velocity < 10 and direction != (0, 0):
            new_position = (position[0] + direction[0], position[1] + direction[1])
            if is_in_matrix(graph, new_position):
                new_weight = weight + graph[new_position[0]][new_position[1]]
                heapq.heappush(
                    priority_queue, (new_weight, new_position, direction, velocity + 1)
                )

        if velocity > 3 or direction == (0, 0):
            for new_direction in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                if new_direction == direction:
                    continue

                if new_direction == (-direction[0], -direction[1]):
                    continue

                new_position = (
                    position[0] + new_direction[0],
                    position[1] + new_direction[1],
                )
                if not is_in_matrix(graph, new_position):
                    continue

                new_weight = weight + graph[new_position[0]][new_position[1]]
                heapq.heappush(
                    priority_queue, (new_weight, new_position, new_direction, 1)
                )

    return -1


weight = dijkstra_part_2(
    matrix, (0, (0, 0), (0, 0), 0), (len(matrix) - 1, len(matrix[0]) - 1)
)
print(weight)
