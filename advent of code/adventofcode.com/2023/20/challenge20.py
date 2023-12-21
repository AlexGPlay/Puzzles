import copy
import math

# Parse input
modules = {}

with open("input.txt") as file:
    lines = file.readlines()
    for line in lines:
        strip_line = line.strip()
        name, non_parsed_destinations = strip_line.split(" -> ")

        destinations = non_parsed_destinations.split(", ")

        if name == "broadcaster":
            modules[name] = {"type": "broadcaster", "destinations": destinations}
            continue

        module_type = name[0]
        module_name = name[1:]

        if module_type == "%":
            modules[module_name] = {
                "type": module_type,
                "destinations": destinations,
                "status": False,
            }
            continue
        if module_type == "&":
            modules[module_name] = {
                "type": module_type,
                "destinations": destinations,
                "status": {},
            }
            continue

# Update conjunction modules
for module in modules:
    module_destinations = modules[module]["destinations"]
    for destination in module_destinations:
        if not modules.get(destination):
            continue

        if modules[destination]["type"] == "&":
            modules[destination]["status"][module] = False


# Util
def process_broadcast_signal(module_name, signal, modules):
    module = modules[module_name]
    destinations = module["destinations"]
    return [(destination, signal, module_name) for destination in destinations]


def process_flip_flop_signal(module_name, signal, modules):
    if signal:
        return []

    module = modules[module_name]
    status = module["status"]
    new_status = not status
    module["status"] = new_status
    destinations = module["destinations"]
    return [(destination, new_status, module_name) for destination in destinations]


def process_conjunction_signal(module_name, signal, sender, modules):
    module = modules[module_name]
    status = module["status"]
    status[sender] = signal
    destinations = module["destinations"]

    to_send_signal = True
    if all(status.values()):
        to_send_signal = False

    return [(destination, to_send_signal, module_name) for destination in destinations]


def send_signals(initial_signal, modules):
    pulse_count = [0, 0]
    signals = [initial_signal]

    while len(signals) > 0:
        sender, signal, origin = signals.pop(0)
        pulse_count[signal] += 1
        if not modules.get(sender):
            continue

        sender_type = modules[sender]["type"]

        if sender_type == "broadcaster":
            new_signals = process_broadcast_signal(sender, signal, modules)
            signals.extend(new_signals)
        elif sender_type == "&":
            new_signals = process_conjunction_signal(sender, signal, origin, modules)
            signals.extend(new_signals)
        elif sender_type == "%":
            new_signals = process_flip_flop_signal(sender, signal, modules)
            signals.extend(new_signals)

    return pulse_count


# Part 1
part_1_modules = copy.deepcopy(modules)
times = 1000
total_result = [0, 0]

for _ in range(times):
    low, high = send_signals(("broadcaster", False, None), part_1_modules)
    total_result[0] += low
    total_result[1] += high

print(total_result[0] * total_result[1])


# Part 2
def send_signals_2(initial_signal, modules, seen, end, cycle_count):
    signals = [initial_signal]

    while len(signals) > 0:
        sender, signal, origin = signals.pop(0)
        if not modules.get(sender):
            continue

        if origin in seen.keys() and signal and sender == end and seen[origin] == None:
            seen[origin] = cycle_count

        sender_type = modules[sender]["type"]

        if sender_type == "broadcaster":
            new_signals = process_broadcast_signal(sender, signal, modules)
            signals.extend(new_signals)
        elif sender_type == "&":
            new_signals = process_conjunction_signal(sender, signal, origin, modules)
            signals.extend(new_signals)
        elif sender_type == "%":
            new_signals = process_flip_flop_signal(sender, signal, modules)
            signals.extend(new_signals)


def get_parents(modules, destination_key):
    parents = []
    for module_name in modules:
        module = modules[module_name]
        if destination_key in module["destinations"]:
            parents.append(module_name)
    return parents


def get_cycle_if_exists(cycle):
    true_index = -1

    for i in range(len(cycle)):
        elem = cycle[i]
        if elem:
            if true_index != -1 and i - true_index > 1:
                return i - true_index

            true_index = i

    return -1


rx_parent = get_parents(modules, "rx")[0]
part_2_modules = copy.deepcopy(modules)

results = {module: None for module in part_2_modules[rx_parent]["status"]}
cycles = 0
while True:
    cycles += 1
    send_signals_2(
        ("broadcaster", False, None), part_2_modules, results, rx_parent, cycles
    )
    if all([results[module] != None for module in results]):
        break

print(math.lcm(*list(results.values())))
