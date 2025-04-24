import React, { useEffect, useState } from 'react';
import Card from './card';
import Search from './Search';

const Coordinates = ({ set_data, data, startPos, endPos, setStartPos, setEndPos, setShortestPath,
  search_value_st ,
  set_search_value_st,
  search_value_end ,
  set_search_value_end,
 }) => {
  const [curr_location, setCurrLocation] = useState([]);
  const [input, setInput] = useState({ start_pos: [], end_pos: [] });
  const [distance_d, setDistance_d] = useState(0);
  const [distance_a, setDistance_a] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Fetching current location
  const getCurrLocation = () => {
    if (!navigator.geolocation) {
      console.log('Browser does not support Geolocation');
    } else {
      navigator.geolocation.getCurrentPosition(getPosition, showError);
    }

    function getPosition(position) {
      const coords = [position.coords.latitude, position.coords.longitude];
      setCurrLocation(coords);
      console.log("Location retrieved:", coords);
    }

    function showError(error) {
      console.warn(`ERROR(${error.code}): ${error.message}`);
    }
  };

  const showData = () => {
    console.log("Fetching current location...");
    getCurrLocation();
  };

  const changeStartAndEnd = (endLat, endLon) => {
    if (curr_location.length === 0) {
      console.log("Waiting for location...");
      return;
    }

    console.log("Start:", curr_location);
    console.log("End:", [endLat, endLon]);

    setStartPos(curr_location);
    setEndPos([endLat, endLon]);
  };

  // Handle form submission to get shortest path
  const handleSubmit = async (inputData = input) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/shortest-path", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setShortestPath(data);
      setDistance_d(data.shortest_distance_d);
      setDistance_a(data.shortest_distance_a);
    } catch (error) {
      setError(error.message || "Failed to fetch path.");
    } finally {
      setLoading(false);
    }
  };

  // Update data based on category
  const update_data = async (category) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/shortest-path/amenities/${category}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      set_data(data);
    } catch (error) {
      console.log("Error - ", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(startPos) && startPos.length && Array.isArray(endPos) && endPos.length) {
      const newInput = {
        start_pos: startPos,
        end_pos: endPos,
      };
      setInput(newInput);
      setDistance_d(0);
      setDistance_a(0);
      handleSubmit(newInput);
    }
  }, [startPos, endPos]);

  return (
    <>
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-70%) translateY(0px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        zIndex: 999,
        backgroundColor: 'transparent',
        padding: '10px',
         borderRadius: '8px',
         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <search type="text"  />
        <button onClick={() => update_data("hospital")}>Hospital</button>
        <button onClick={() => update_data("clinic")}>Clinic</button>
        <button onClick={() => update_data("police")}>Police</button>
        <button onClick={() => update_data("fuel")}>fuel</button>
        <button onClick={() => update_data("atm")}>ATM</button>
        <button onClick={() => update_data("bank")}>Bank</button>
        <button onClick={() => update_data("restaurant")}>restaurant</button>
        <button onClick={() => update_data("school")}>school</button>
        <button onClick={() => update_data("college")}>college</button>
        <button onClick={() => update_data("university")}>university</button>
        <button onClick={() => update_data("cafe")}>cafe</button>
        <button onClick={() => update_data("place_of_worship")}>Religious</button>
      </div>

      <div className="coordinates-panel">
        <h1>Coordinates</h1>
        <h3>Positions</h3>
        
        
        <Search setStartPos={setStartPos}  setEndPos={setEndPos}  search_value_st ={search_value_st}
            set_search_value_st={set_search_value_st}
            search_value_end ={search_value_end}
            set_search_value_end={set_search_value_end}/>
        

        {loading && <p>Calculating shortest path...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {distance_d > 0 && <p>Distance (Dijkstra): {distance_d} km</p>}
        {distance_a > 0 && <p>Distance (A*): {distance_a} km</p>}

        {data != null && (
          <>
            {data.length>1 &&<h4>List</h4>}
            <ul style={{ margin: '0px', padding: '0px', listStyleType: 'none' }}>
              {data.map((item, index) => (
                  <li key={index} style={{ padding: '0px', margin: '0px' }}>
                    <Card data={item} changest_end={changeStartAndEnd} showData={showData}   search_value_st ={search_value_st}
            set_search_value_st={set_search_value_st}
            search_value_end ={search_value_end}
            set_search_value_end={set_search_value_end}/>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Coordinates;
