# import sys
# sys.path.append('C:\\course\\DAA\\React\\backend\\algo')

# from eucli import haversine
  
from math import radians, sin, cos, sqrt, atan2

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c
  
def find_nearest_node(graph, lat, lon):
    print("here  -------------------")
    min_dist = float("inf")
    nearest_node = None
    for node, data in graph.nodes(data=True):
        node_lat = data.get("lat") or data.get("y")
        node_lon = data.get("lon") or data.get("x")
        if node_lat is not None and node_lon is not None:
            dist = haversine(lat, lon, node_lat, node_lon)
            if dist < min_dist:
                min_dist = dist
                nearest_node = node
    return nearest_node
