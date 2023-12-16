# Parse input
sequences = None
with open("input.txt") as file:
    line = file.readline()
    sequences = line.strip().split(",")


# Util
def hash_string(string):
    current_value = 0
    for letter in list(string):
        char = letter.strip()
        current_value += ord(char)
        current_value *= 17
        current_value %= 256

    return current_value


# Part 1

sequence_values = []
for sequence in sequences:
    current_value = hash_string(sequence)
    sequence_values.append(current_value)

print(sum(sequence_values))


# Part 2
def get_index(letters, box):
    index = -1
    for i in range(len(box)):
        if letters in box[i]:
            index = i
            break
    return index


boxes = {}

for sequence in sequences:
    current_value = 0
    if "-" in sequence:
        letters = sequence.split("-")[0]
        hash_value = hash_string(letters)

        index = get_index(letters, boxes.get(hash_value, []))
        if index == -1:
            continue
        boxes[hash_value].pop(index)

    elif "=" in sequence:
        letters, value = sequence.split("=")
        hash_value = hash_string(letters)

        if hash_value not in boxes:
            boxes[hash_value] = []

        index = get_index(letters, boxes[hash_value])
        if index == -1:
            boxes[hash_value].append((letters, value))
        else:
            boxes[hash_value][index] = (letters, value)

values = []
for box_index, box in boxes.items():
    for i in range(0, len(box)):
        _, value = box[i]
        values.append((box_index + 1) * (i + 1) * int(value))

print(sum(values))
