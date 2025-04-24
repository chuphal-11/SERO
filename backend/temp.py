import pickle
import requests
import time
#to check path exist or not 
from algo.dijkstra import dijkstra
from algo.find_nearest_node import find_nearest_node

# def get_coordinates_from_name(name):
#     url = f'https://nominatim.openstreetmap.org/search?q={name}&format=json'
#     try:
#         response = requests.get(url, headers={'User-Agent': 'my-app'})  
#         if response.status_code == 200:
#             data = response.json()
#             if data:
#                 lat = float(data[0].get('lat'))
#                 lon = float(data[0].get('lon'))
#                 return lat, lon
#             else:
#                 print(f"No results found for {name}")
#                 return None, None
#         else:
#             print(f"Request failed with status code: {response.status_code}")
#             return None, None
#     except Exception as e:
#         print(f"Error fetching coordinates for {name}: {e}")
#         return None, None
# def get_amnities(category):
#     data = pickle.load(open("Graphs/amenities_grouped.pkl", "rb"))
#     cleaned_data = []
   
#     for entry in data.get(category, []):
#         if 'lat' in entry and 'lon' in entry:
#             cleaned_data.append(entry)
#         else:
#             print(f"Missing lat/lon for entry: {entry}")
#             name_or_brand = entry['tags'].get('name') or entry['tags'].get('brand')
            
#             if name_or_brand:
#                 if name_or_brand == 'Bharat Petroleum':
#                     lat, lon = 29.3646787,79.5461571
#                     print(f"Using hardcoded coordinates for {name_or_brand}")
#                 else:
#                     lat, lon = get_coordinates_from_name(name_or_brand)
               
#                 if lat and lon:
#                     entry['lat'] = lat
#                     entry['lon'] = lon
#                     cleaned_data.append(entry)
#                     print(f"Geocoded: {name_or_brand} => ({lat}, {lon})")
#                 else:
#                     print(f"Could not fetch coordinates for {name_or_brand}")
#             else:
#                 print("No name or brand for geocoding.")
#         time.sleep(1)  # Nominatim API rate limit
#     return cleaned_data
# print(get_amnities('fuel'))
def get_amnities(category):
    data = pickle.load(open("Graphs/updated_amenities_with_address.pkl", "rb"))
    print(data)
    cleaned_data = []
    for x in data[category]:
        cleaned_data.append(x)
    return cleaned_data


print(get_amnities('restaurant'))


import pickle
import requests
import time

def get_coordinates_from_name(name):
    url = f'https://nominatim.openstreetmap.org/search?q={name}&format=json'
    try:
        response = requests.get(url, headers={'User-Agent': 'my-app'})
        if response.status_code == 200:
            data = response.json()
            if data:
                return float(data[0]['lat']), float(data[0]['lon'])
        print(f" No results found for name: {name}")
    except Exception as e:
        print(f"⚠ Error fetching coordinates for {name}: {e}")
    return None, None

def get_address_from_coordinates(lat, lon):
    url = f'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}'
    try:
        response = requests.get(url, headers={'User-Agent': 'my-app'})
        if response.status_code == 200:
            data = response.json()
            return data.get('display_name', '')
        print(f" Address not found for coordinates: ({lat}, {lon})")
    except Exception as e:
        print(f" Error fetching address: {e}")
    return ""

def get_address_from_name(name):
    url = f'https://nominatim.openstreetmap.org/search?q={name}&format=json&addressdetails=1'
    try:
        response = requests.get(url, headers={'User-Agent': 'my-app'})
        if response.status_code == 200:
            data = response.json()
            if data:
                return data[0].get('display_name', '')
        print(f"No address found from name: {name}")
    except Exception as e:
        print(f" Error fetching address for name '{name}': {e}")
    return ""

def update_amenities_with_coordinates():
    path = "Graphs/amenities_grouped.pkl"
    data = pickle.load(open(path, "rb"))

    with open("Graphs/road_network_graph.pkl", "rb") as f:
        G = pickle.load(f)
     
    cleaned_data = dict()
    
    for amenity_type, entries in data.items():
        if amenity_type not in cleaned_data:
            cleaned_data[amenity_type] = []
        
        for entry in entries:
            name = entry['tags'].get('name') or entry['tags'].get('brand')
            lat, lon = None, None

            if 'lat' in entry and 'lon' in entry:
                lat, lon = entry['lat'], entry['lon']
            elif name:
                lat, lon = get_coordinates_from_name(name)
                time.sleep(1)

            if lat and lon:
                try:
                    start_pos = (lat, lon)
                    end_pos = (29.3544219, 79.5552435) 
                    start_node = find_nearest_node(G, *start_pos)
                    end_node = find_nearest_node(G, *end_pos)
                    shortest_path_d, _, _, _ = dijkstra(G, start_node, end_node)

                    if len(shortest_path_d) > 1 and name:
                        address = get_address_from_coordinates(lat, lon)
                        time.sleep(1)

                        if not address and name:
                            address = get_address_from_name(name)
                            time.sleep(1)

                        if not address:
                            print(f" Skipping {name} — no address found via lat/lon or name")
                            continue

                        cleaned_data[amenity_type].append({
                            'id': entry['id'],
                            'lat': lat,
                            'lon': lon,
                            'name': name,
                            'category': amenity_type,
                            'address': address
                        })
                        print(f" Added {name} with address: {address}")
                    else:
                        print(f" No valid path found for {name}")
                except Exception as e:
                    print(f" Error processing entry ID {entry['id']}: {e}")
            else:
                print(f" No coordinates available for entry ID {entry['id']}")

    with open("Graphs/updated_amenities_with_address.pkl", "wb") as f:
        pickle.dump(cleaned_data, f)

    print(" Updated amenities with address saved to 'Graphs/updated_amenities_with_address.pkl'")

# update_amenities_with_coordinates()
