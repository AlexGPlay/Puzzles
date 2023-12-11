from collections import Counter
from functools import cmp_to_key

# Util variables
card_ranks_part_1 = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
card_ranks_part_2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]
type_ranks = [[5], [4, 1], [3, 2], [3, 1, 1], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]]

# Parse input data
file_data = []

with open("input.txt") as file:
    data = file.readlines()
    for line in data:
        hand, bid = line.split(" ")
        file_data.append({"hand": hand, "bid": int(bid)})


# Part 1
def score_hand_part_1(hand1, hand2):
    counted_elements_hand_1 = list(dict(Counter(hand1["hand"])).values())
    counted_elements_hand_2 = list(dict(Counter(hand2["hand"])).values())

    ranked_type_hand_1 = type_ranks.index(sorted(counted_elements_hand_1, reverse=True))
    ranked_type_hand_2 = type_ranks.index(sorted(counted_elements_hand_2, reverse=True))

    if ranked_type_hand_1 != ranked_type_hand_2:
        return ranked_type_hand_1 - ranked_type_hand_2

    for i in range(len(hand1["hand"])):
        hand_1_card_rank = card_ranks_part_1.index(hand1["hand"][i])
        hand_2_card_rank = card_ranks_part_1.index(hand2["hand"][i])

        if hand_1_card_rank != hand_2_card_rank:
            return hand_1_card_rank - hand_2_card_rank

    return 0


sorted_data = sorted(file_data, key=cmp_to_key(score_hand_part_1), reverse=True)
total_win = [data["bid"] * (i + 1) for i, data in enumerate(sorted_data)]
print(sum(total_win))


# Part 2
def score_hand_part_2(hand1, hand2):
    # Hand 1
    repeated_elements_hand_1 = dict(Counter(hand1["hand"]))
    j_hand_1 = repeated_elements_hand_1.pop("J", 0)

    counted_elements_hand_1 = list(repeated_elements_hand_1.values())
    if len(counted_elements_hand_1) == 0:
        counted_elements_hand_1.append(5)
    else:
        biggest_value_hand_1 = max(counted_elements_hand_1)
        counted_elements_hand_1[
            counted_elements_hand_1.index(biggest_value_hand_1)
        ] += j_hand_1

    # Hand 2
    repeated_elements_hand_2 = dict(Counter(hand2["hand"]))
    j_hand_2 = repeated_elements_hand_2.pop("J", 0)

    counted_elements_hand_2 = list(repeated_elements_hand_2.values())
    if len(counted_elements_hand_2) == 0:
        counted_elements_hand_2.append(5)
    else:
        biggest_value_hand_2 = max(counted_elements_hand_2)
        counted_elements_hand_2[
            counted_elements_hand_2.index(biggest_value_hand_2)
        ] += j_hand_2

    ranked_type_hand_1 = type_ranks.index(sorted(counted_elements_hand_1, reverse=True))
    ranked_type_hand_2 = type_ranks.index(sorted(counted_elements_hand_2, reverse=True))

    if ranked_type_hand_1 != ranked_type_hand_2:
        return ranked_type_hand_1 - ranked_type_hand_2

    for i in range(len(hand1["hand"])):
        hand_1_card_rank = card_ranks_part_2.index(hand1["hand"][i])
        hand_2_card_rank = card_ranks_part_2.index(hand2["hand"][i])

        if hand_1_card_rank != hand_2_card_rank:
            return hand_1_card_rank - hand_2_card_rank

    return 0


sorted_data = sorted(file_data, key=cmp_to_key(score_hand_part_2), reverse=True)
total_win = [data["bid"] * (i + 1) for i, data in enumerate(sorted_data)]
print(sum(total_win))
