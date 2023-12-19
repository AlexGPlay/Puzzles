import re

# Parse input
rules = {}
ratings = []

with open("example.txt") as file:
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


# Part 1
result = 0
for rating in ratings:
    result += evaluate_rating(rating)
print(result)
