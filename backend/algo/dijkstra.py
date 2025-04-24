import heapq
from math import radians, sin, cos, sqrt, atan2

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c  # Return distance in km

def dijkstra(graph, start_node, end_node):
    pq = [(0, start_node)]  # Priority Queue
    distances = {node: float("inf") for node in graph.nodes}  # Store distances from start node
    distances[start_node] = 0
    previous_nodes = {}
    visited = set()
    cnt = 0  # Counter for number of edges processed

    while pq:
        current_dist, current_node = heapq.heappop(pq)

        if current_node == end_node:
            break

        if current_node in visited:
            continue

        visited.add(current_node)

        for neighbor in graph.neighbors(current_node):
            # Calculate distance using haversine for geographical distance between nodes
            lat1 = graph.nodes[current_node].get('lat') or graph.nodes[current_node].get('y')
            lon1 = graph.nodes[current_node].get('lon') or graph.nodes[current_node].get('x')
            lat2 = graph.nodes[neighbor].get('lat') or graph.nodes[neighbor].get('y')
            lon2 = graph.nodes[neighbor].get('lon') or graph.nodes[neighbor].get('x')

            # Compute distance using haversine
            edge_weight = haversine(lat1, lon1, lat2, lon2)

            # Calculate the new distance to the neighbor
            new_distance = current_dist + edge_weight

            # If the new distance is smaller, update the shortest distance and previous node
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(pq, (new_distance, neighbor))
                cnt += 1

    # Reconstruct the path from end_node to start_node
    path = []
    current = end_node
    distance = 0
    while current in previous_nodes:
        lat = graph.nodes[current].get('lat') or graph.nodes[current].get('y')
        lon = graph.nodes[current].get('lon') or graph.nodes[current].get('x')
        path.append((lat, lon))
        current = previous_nodes[current]

    # Add starting point
    lat_start = graph.nodes[start_node].get('lat') or graph.nodes[start_node].get('y')
    lon_start = graph.nodes[start_node].get('lon') or graph.nodes[start_node].get('x')
    path.append((lat_start, lon_start))
    path.reverse()

    return path, distances[end_node], visited, cnt