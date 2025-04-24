import heapq
import networkx as nx


def a_star(graph, start_node, end_node):
    def heuristic(n1, n2):
        # Use zero heuristic for Dijkstra-like behavior (or add one if needed later)
        return 0

    pq = [(heuristic(start_node, end_node), 0, start_node)]
    distances = {node: float("inf") for node in graph.nodes}
    distances[start_node] = 0
    previous_nodes = {}
    visited = set()

    while pq:
        _, current_dist, current_node = heapq.heappop(pq)
        if current_node == end_node:
            break

        if current_node in visited:
            continue
        visited.add(current_node)

        for neighbor in graph.neighbors(current_node):
            if 'weight' not in graph[current_node][neighbor]:
                continue  # Skip if no weight is defined

            edge_weight = graph[current_node][neighbor]['weight']  # Already in meters
            new_distance = current_dist + edge_weight
            estimate = new_distance + heuristic(neighbor, end_node)

            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(pq, (estimate, new_distance, neighbor))

    # Reconstruct the path
    path = []
    current = end_node
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

    return path, distances[end_node], visited  # distance in meters
