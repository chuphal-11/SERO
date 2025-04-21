def euclidean_distance(G,start_node,end_node):
    lat1,lon1 = G.nodes[start_node]['pos']
    lat2,lon2 = G.nodes[end_node]['pos']
    dist = ((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) ** 0.5
    return dist
