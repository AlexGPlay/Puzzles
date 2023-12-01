numbers = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

with open("input.txt") as file:
    content = file.readlines()

    # First part
    first_part_numbers = []

    for line in content:
        line_numbers = [x for x in line if x.isnumeric()]
        first_part_numbers.append(int(f"{line_numbers[0]}{line_numbers[-1]}"))

    print(sum(first_part_numbers))

    # Second part
    second_part_numbers = []
    for line in content:
        line_numbers = []
        for i in range(len(line)):
            if line[i].isnumeric():
                line_numbers.append(line[i])
                continue
            for number_index in range(1, len(numbers)):
                number = numbers[number_index]
                number_size = len(number)
                if line[i : i + number_size] == number:
                    line_numbers.append(str(numbers.index(number)))
                    break

        second_part_numbers.append(int(f"{line_numbers[0]}{line_numbers[-1]}"))

    print(sum(second_part_numbers))
