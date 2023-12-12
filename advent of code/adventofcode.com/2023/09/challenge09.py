histories = []

# Parse input
with open("input.txt") as file:
    for line in file.readlines():
        history = [int(x) for x in line.strip().split(" ")]
        histories.append(history)

# Part 1
part_1_final_values = []

for history in histories:
    extrapolated_history = [history]

    are_all_zero = False
    while not are_all_zero:
        new_range = []

        for i in range(len(extrapolated_history[-1]) - 1):
            new_range.append(
                extrapolated_history[-1][i + 1] - extrapolated_history[-1][i]
            )

        are_all_zero = all([x == 0 for x in new_range])
        extrapolated_history.append(new_range)

    for i in range(len(extrapolated_history) - 1):
        idx = len(extrapolated_history) - i - 1

        prev_history_number = extrapolated_history[idx - 1][-1]
        last_history_number = extrapolated_history[idx][-1]

        extrapolated_history[idx - 1].append(prev_history_number + last_history_number)

    part_1_final_values.append(extrapolated_history[0][-1])

print(sum(part_1_final_values))

# Part 2
part_2_final_values = []

for history in histories:
    extrapolated_history = [history]

    are_all_zero = False
    while not are_all_zero:
        new_range = []

        for i in range(len(extrapolated_history[-1]) - 1):
            new_range.append(
                extrapolated_history[-1][i + 1] - extrapolated_history[-1][i]
            )

        are_all_zero = all([x == 0 for x in new_range])
        extrapolated_history.append(new_range)

    for i in range(len(extrapolated_history) - 1):
        idx = len(extrapolated_history) - i - 1

        prev_history_number = extrapolated_history[idx - 1][0]
        last_history_number = extrapolated_history[idx][0]

        extrapolated_history[idx - 1].insert(
            0, prev_history_number - last_history_number
        )

    part_2_final_values.append(extrapolated_history[0][0])

print(sum(part_2_final_values))
