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
                    "destination_range": range(
                        destination_range, destination_range + range_length
                    ),
                    "source_range": range(source_range, source_range + range_length),
                }
            )

        # Sort and fill range gaps
        mapping[from_name]["ranges"].sort(key=lambda range: range["source_range"].start)
        needed_ranges = [mapping[from_name]["ranges"][0]]

        for current_range in mapping[from_name]["ranges"][1:]:
            if (
                current_range["source_range"].start
                > needed_ranges[-1]["source_range"].stop
            ):
                new_range = range(
                    needed_ranges[-1]["source_range"].stop,
                    current_range["source_range"].start,
                )
                needed_ranges.append(
                    {"destination_range": new_range, "source_range": new_range}
                )

            needed_ranges.append(current_range)

        mapping[from_name]["ranges"] = needed_ranges


# First part
current_mapping = [*seeds]
results = []


def get_mapped_value(value, type):
    type_mapping = mapping.get(type, None)
    if type_mapping is None:
        return None

    to_type = type_mapping["to"]

    for range in type_mapping["ranges"]:
        if value in range["source_range"]:
            return (
                range["destination_range"].start
                + (value - range["source_range"].start),
                to_type,
            )

    return value, to_type


for seed in current_mapping:
    current_type = "seed"
    value = seed

    while True:
        result = get_mapped_value(value, current_type)
        if result is None:
            results.append(value)
            break
        value = result[0]
        current_type = result[1]

print(min(results))

# Second part
ranged_seeds = [
    range(seeds[i], seeds[i] + seeds[i + 1]) for i in range(0, len(seeds) - 1, 2)
]

second_part_results = []
counter = 0


def expand_range(current_range, current_type):
    if mapping.get(current_type, None) is None:
        return None

    involved_ranges = [
        type_range
        for type_range in mapping[current_type]["ranges"]
        if current_range.start <= type_range["source_range"].stop
        and current_range.stop >= type_range["source_range"].start
    ]

    new_seeded_ranges = []
    if current_range.start < mapping[current_type]["ranges"][0]["source_range"].start:
        new_seeded_ranges.append(
            range(
                current_range.start,
                min(
                    current_range.stop,
                    mapping[current_type]["ranges"][0]["destination_range"].start,
                ),
            )
        )

    if current_range.stop > mapping[current_type]["ranges"][-1]["source_range"].stop:
        new_seeded_ranges.append(
            range(
                max(
                    mapping[current_type]["ranges"][-1]["destination_range"].stop,
                    current_range.start,
                ),
                current_range.stop,
            )
        )

    for type_range in involved_ranges:
        intersected_range = range(
            max(current_range.start, type_range["source_range"].start),
            min(current_range.stop, type_range["source_range"].stop),
        )
        transformed_range = range(
            type_range["destination_range"].start
            + (intersected_range.start - type_range["source_range"].start),
            type_range["destination_range"].start
            + (intersected_range.stop - type_range["source_range"].start),
        )

        new_seeded_ranges.append(transformed_range)

    return new_seeded_ranges, mapping[current_type]["to"]


saved_results = []
for seed in ranged_seeds:
    current_type = "seed"
    to_use = [seed]

    result = expand_range(seed, current_type)
    to_use = result[0]
    while result is not None:
        current_type = result[1]
        new_results = []
        for expanded_result in to_use:
            result = expand_range(expanded_result, current_type)
            if result is None:
                saved_results.extend(to_use)
            else:
                new_results.extend(result[0])
        to_use = new_results

print(min([rng.start for rng in saved_results]))
