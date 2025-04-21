import heapq
def dijkstra(graph, start_node, end_node):

    pq = [(0, start_node)]
    distances = {node: float("inf") for node in graph.nodes}
    distances[start_node] = 0
    previous_nodes = {}
    visited = set()
    cnt=0
    while pq:
        current_dist, current_node = heapq.heappop(pq)


        if current_node == end_node:
            break

        for neighbor in graph.neighbors(current_node):
            edge_weight = graph[current_node][neighbor]["weight"]
            new_distance = current_dist + edge_weight


            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(pq, (new_distance, neighbor))
                cnt +=1
                visited.add(neighbor)



    path = []
    current = end_node
    while current in previous_nodes:
        path.append(graph.nodes[current]['pos'])
        current = previous_nodes[current]
    path.append(graph.nodes[start_node]['pos'])
    path.reverse()

    return path, distances[end_node],visited,cnt

