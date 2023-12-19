import re

# Parse input
rules = {}
ratings = []

with open("input.txt") as file:
    possible_rules, possible_ratings = file.read().split("\n\n")

    for rule in possible_rules.split("\n"):
        match = re.search(r"(?P<name>\w+){(?P<content>.*)}", rule)
        name = match.group("name")
        content = match.group("content").split(",")

        matched_rules = []
        for possible_rule in content:
            if ":" not in possible_rule:
                matched_rules.append(("True", possible_rule.strip()))
                continue

            matched_rules.append(tuple(possible_rule.split(":")))
        rules[name] = matched_rules

    for rating in possible_ratings.split("\n"):
        values = re.findall(r"([A-z])=(\d+)", rating)
        result = {}
        for value in values:
            result[value[0]] = int(value[1])

        ratings.append({"rules": result, "workflow": "in"})


# Util
def get_next_workflow(rating, workflow_key):
    workflow = rules[workflow_key]

    x = rating["x"]
    m = rating["m"]
    a = rating["a"]
    s = rating["s"]

    for rule, next_step in workflow:
        result = eval(rule)
        if result:
            return next_step


def evaluate_rating(rating):
    current_workflow_key = rating["workflow"]
    rules = rating["rules"]

    while current_workflow_key != "A" and current_workflow_key != "R":
        current_workflow_key = get_next_workflow(rules, current_workflow_key)

    if current_workflow_key == "A":
        return sum(rules.values())

    return 0


def split_rule_by_workflow(rule, workflow):
    split = []
    copy_rule = rule.copy()

    for condition, new_workflow_key in workflow:
        if condition == "True":
            split.append((copy_rule, new_workflow_key))
            continue

        results = re.search(r"(?P<name>\w+)(?P<operation><|>)(?P<value>\d+)", condition)
        variable_name = results.group("name")
        operation = results.group("operation")
        value = int(results.group("value"))

        if operation == "<":
            new_rule = copy_rule.copy()
            new_rule[variable_name] = (copy_rule[variable_name][0], value - 1)
            copy_rule[variable_name] = (value, copy_rule[variable_name][1])
            split.append((new_rule, new_workflow_key))
        elif operation == ">":
            new_rule = copy_rule.copy()
            new_rule[variable_name] = (value + 1, copy_rule[variable_name][1])
            copy_rule[variable_name] = (copy_rule[variable_name][0], value)
            split.append((new_rule, new_workflow_key))

    return split


# Part 1
result = 0
for rating in ratings:
    result += evaluate_rating(rating)
print(result)

# Part 2
part_2_base_rule = {
    "x": (1, 4000),
    "m": (1, 4000),
    "a": (1, 4000),
    "s": (1, 4000),
}

pending_rules = [(part_2_base_rule, "in")]
results = []

while len(pending_rules) > 0:
    rule, workflow_key = pending_rules.pop(0)
    new_rules = split_rule_by_workflow(rule, rules[workflow_key])

    for new_rule, new_workflow_key in new_rules:
        if new_workflow_key == "A":
            results.append(new_rule)
            continue
        elif new_workflow_key == "R":
            continue

        pending_rules.append((new_rule, new_workflow_key))

total_results = 0
for result in results:
    part = 1
    for value in result.values():
        part *= value[1] - value[0] + 1
    total_results += part

print(total_results)
