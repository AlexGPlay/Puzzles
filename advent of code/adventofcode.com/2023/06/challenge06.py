import re

race_data = []
with open('input.txt') as file:
    data = file.readlines()
    times = re.findall('\d+', data[0])
    distances = re.findall('\d+', data[1])
    for i in range(len(times)):
        race_data.append({ "time": int(times[i]), "distance": int(distances[i]) })

# Util
def get_number_of_ways_of_winning(race):
    wins = 0

    for i in range(1, race['time']):
        speed = i
        time_left = race['time'] - i
        run_distance = speed * time_left
        if run_distance > race['distance']:
            wins += 1

    return wins

# Part 1
number_of_winning_ways = []
for race in race_data:
    wins = get_number_of_ways_of_winning(race)
    number_of_winning_ways.append(wins)

multiplied_result = 1
for i in number_of_winning_ways:
    multiplied_result *= i

print(multiplied_result)

# Part 2
unified_race_data = {
    "time": int("".join([str(race['time']) for race in race_data])),
    "distance":  int("".join([str(race['distance']) for race in race_data])),
}

print(get_number_of_ways_of_winning(unified_race_data))