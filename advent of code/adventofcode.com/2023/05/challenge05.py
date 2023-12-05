import re

seeds = []
mapping = {}

# Parse file
with open("input.txt") as file:
    lines = file.read()
    groups = lines.split("\n\n")
    seeds = [int(seed) for seed in re.findall("\d+", groups[0])]

    for group in range(1, len(groups)):
        group_name, *group_mappings = groups[group].split("\n")

        name_match = re.match("(?P<from>\w+)-to-(?P<to>\w+)", group_name)
        from_name = name_match.group("from")
        to_name = name_match.group("to")

        mapping[from_name] = {"to": to_name, "ranges": []}
        for group_mapping in group_mappings:
            destination_range, source_range, range_length = [
                int(n) for n in group_mapping.split(" ")
            ]
            mapping[from_name]["ranges"].append(
                {
                    "destination_range": {
                        "from": destination_range,
                        "to": destination_range + range_length - 1,
                    },
                    "source_range": {
                        "from": source_range,
                        "to": source_range + range_length - 1,
                    },
                }
            )


# Util
def get_mapped_value(value, type):
    type_mapping = mapping.get(type, None)
    if type_mapping is None:
        return None

    to_type = type_mapping["to"]

    for range in type_mapping["ranges"]:
        if range["source_range"]["from"] <= value <= range["source_range"]["to"]:
            return {
                to_type: range["destination_range"]["from"]
                + (value - range["source_range"]["from"])
            }
    return {to_type: value}


# First part
current_mapping = [{"seed": int(seed)} for seed in seeds]
for seed in current_mapping:
    current_type = "seed"

    while True:
        value = get_mapped_value(seed[current_type], current_type)
        if value is None:
            break

        current_type = list(value.keys())[0]
        seed[current_type] = value[current_type]

print(min([seed_mapping["location"] for seed_mapping in current_mapping]))

# Second part
pairs = [(seeds[i], seeds[i + 1]) for i in range(0, len(seeds) - 1, 2)]
ranged_seeds = []
for init, length in pairs:
    for i in range(init, init + length):
        ranged_seeds.append({"seed": i})


for seed in ranged_seeds:
    current_type = "seed"

    while True:
        value = get_mapped_value(seed[current_type], current_type)
        if value is None:
            break

        current_type = list(value.keys())[0]
        seed[current_type] = value[current_type]

print(min([seed_mapping["location"] for seed_mapping in ranged_seeds]))
