import React, { useEffect, useState } from 'react';

const Coordinates = ({ startPos, endPos, setShortestPath }) => {
  const [input, setInput] = useState({
    start_pos: [],
    end_pos: [],
  });
  const [distance_d, setDistance_d] = useState(0);
  const [distance_a, setDistance_a] = useState(0);  
  useEffect(() => {
    if (startPos && endPos) {
      setInput({
        start_pos: startPos,
        end_pos: endPos,
      });
    }
  }, [startPos, endPos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending Start Position:", input.start_pos);
      console.log("Sending End Position:", input.end_pos);

      const res = await fetch("http://127.0.0.1:5000/api/shortest-path", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      console.log('Path response: ', data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      
      setShortestPath(data);
      setDistance_d(data.shortest_distance_d); 
      setDistance_a(data.shortest_distance_a); 

    } catch (error) {
      console.error("Error fetching path:", error);
    }
  };

  return (
    <>
      <div>
      <h1>Coordinates</h1>
        <h3>positions</h3>
        <p>
          Start position: {JSON.stringify(startPos)}                 End position: {JSON.stringify(endPos)}
        </p>
        {distance_d > 0 && <p>Distance dijskatra: {distance_d} km</p>}
        {distance_a > 0 && <p>Distance astar: {distance_a} km</p>}
      
        </div>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Find Path</button>
      </form>
    </>
  );
};

export default Coordinates;
