import re

cards_and_solutions = []

# Parse data
with open("input.txt") as file:
    lines = file.readlines()
    for line in lines:
        _, data = line.split(":")
        card_numbers_part, winning_numbers_part = data.split("|")
        # card_numbers = [int(x) for x in card_numbers_part.split()]
        winning_numbers = [int(x) for x in re.findall(r"\d+", winning_numbers_part)]

        cards_and_solutions.append((card_numbers_part, winning_numbers))


# Util
def find_matches_len(card_idx):
    card_numbers, winning_numbers = cards_and_solutions[card_idx]
    regex = "|".join([f"\\b{x}\\b" for x in winning_numbers])
    return len(re.findall(regex, card_numbers))


# Part 1
points_per_card = []
for i in range(len(cards_and_solutions)):
    matches = find_matches_len(i)
    if matches == 0:
        points_per_card.append(0)
        continue
    points_per_card.append(2 ** (matches - 1))

print(sum(points_per_card))

# Part 2
number_of_cards = [1 for _ in cards_and_solutions]
for i in range(len(cards_and_solutions) - 1):
    matches = find_matches_len(i)
    if matches == 0:
        continue
    for j in range(matches):
        adding_idx = i + j + 1
        if adding_idx >= len(cards_and_solutions):
            break
        number_of_cards[adding_idx] += number_of_cards[i]

print(sum(number_of_cards))
