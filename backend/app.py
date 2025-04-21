from algo.astar import a_star
from algo.dijkstra import dijkstra
from algo.find_nearest_node import find_nearest_node

import pickle
#flask modules
from flask import Flask, jsonify, request
import json

from flask_cors import CORS
with open("Graphs/graph_with_weights.pkl", "rb") as f:
    G = pickle.load(f)
start_pos = (29.389820, 79.490701)
end_pos = (29.377335, 79.474474)


start_node = find_nearest_node(G, *start_pos)
end_node = find_nearest_node(G, *end_pos)

print(f"Start Node: {start_node}, End Node: {end_node}")


shortest_path_d, shortest_distance_d,visited_d,cnt_d = dijkstra(G, start_node, end_node)
shortest_path_a, shortest_distance_a,visited_a = a_star(G, start_node, end_node)


# print("Shortest Path:", shortest_path)
# print(f"Total Distance: {shortest_distance:.4f} km")
# print(f" nodes visited: ",visited)
# print("count1 - ",len(shortest_path))
# print("count - ",cnt)


# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/shortest-path', methods=['GET'])
def get_shortest_path():
    response = {
        'shortest_path_d': shortest_path_d,
        'shortest_path_a': shortest_path_a,
    }
    return jsonify(response)


@app.route('/api/shortest-path', methods=['POST'])
def get_path():
    try:
        data = request.json
        print("----------------------------------------------------------------------------------------------------------------")
        print(data)
        # Validate fields
        required_fields = ['start_pos', 'end_pos']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        start_pos = tuple(data['start_pos'])  
        end_pos = tuple(data['end_pos'])

        start_node = find_nearest_node(G, *start_pos)
        end_node = find_nearest_node(G, *end_pos)

        shortest_path_d, shortest_distance_d, visited_d, cnt_d = dijkstra(G, start_node, end_node)
        shortest_path_a, shortest_distance_a, visited_a = a_star(G, start_node, end_node)

        response = {
            'shortest_path_d': shortest_path_d,
            'shortest_path_a': shortest_path_a,
            'shortest_distance_d': shortest_distance_d,
            'shortest_distance_a': shortest_distance_a
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True) 