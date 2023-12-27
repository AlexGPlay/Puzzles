import networkx as nx

# Parse input
graph = nx.Graph()

with open("input.txt") as file:
    for line in file.read().splitlines():
        from_c, to_c = line.split(":")
        to_cs = to_c.strip().split(" ")

        for to in to_cs:
            graph.add_edge(from_c, to)


# Part 1
graph_cut = nx.minimum_edge_cut(graph)
graph.remove_edges_from(graph_cut)
res = 1
for component in nx.connected_components(graph):
    res *= len(component)

print(res)
