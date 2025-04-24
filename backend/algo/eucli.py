from math import radians, sin, cos, sqrt, atan2
def euclidean_distance(G,start_node,end_node):
    lat1,lon1 = G.nodes[start_node]['pos']
    lat2,lon2 = G.nodes[end_node]['pos']
    dist = ((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) ** 0.5
    return dist



def haversine(lat1, lon1, lat2, lon2):
    print("heaver - - - - ")
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c