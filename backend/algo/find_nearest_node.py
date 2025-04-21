def find_nearest_node(graph, lat, lon):
    min_dist = float("inf")
    nearest_node = None
    for node, data in graph.nodes(data=True):
        node_lat, node_lon = data["pos"]
        dist = ((lat - node_lat) ** 2 + (lon - node_lon) ** 2) ** 0.5
        if dist < min_dist:
            min_dist = dist
            nearest_node = node
    return nearest_node