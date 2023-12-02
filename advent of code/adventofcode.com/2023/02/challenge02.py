import re

games = {}

# Parse the input
with open('input.txt') as file:
    lines = file.readlines()

    for line in lines:
        game, all_sets = line.split(":")

        gameId = re.search(r'Game (?P<id>\d+)', game).group('id')
        games[gameId] = []

        sets = all_sets.split(";")
        for set in sets:
            values = {}
            for value in set.split(","):
                result = re.search(r'(?P<quantity>\d+) (?P<color>\w+)', value)
                if values.get(result.group('color')):
                    values[result.group('color')] += int(result.group('quantity'))
                else:
                    values[result.group('color')] = int(result.group('quantity'))
            games[gameId].append(values)

# Part 1 solution
MAX_PER_COLOR = {
    "red": 12,
    "green": 13,
    "blue": 14
}

possible_ids = []
for game in games:

    for set in games[game]:
        for color in set:
            if set[color] > MAX_PER_COLOR[color]:
                break
        else:
            continue
        break
    else:
        possible_ids.append(int(game))

print(sum(possible_ids))

# Part 2 solution
games_power = []
for game in games:
    minimum_per_color = {
        "red": 0,
        "green": 0,
        "blue": 0
    }
    for set in games[game]:
        for color in set:
            if set[color] > minimum_per_color[color]:
                minimum_per_color[color] = set[color]
    
    games_power.append(minimum_per_color["red"] * minimum_per_color["green"] * minimum_per_color["blue"])

print(sum(games_power))