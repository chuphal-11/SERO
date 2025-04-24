import React, { useEffect, useState } from 'react'

const Attributes = ({ data, setStartPos, setEndPos }) => {
  const [curr_location, setCurrLocation] = useState([]);

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

  return (
    <>
      <ul>
        {data != null && data.map((item, index) => (
          <li key={index}>
            <h2>{item.tags.name}</h2>
            <h6>{item.lat}</h6>
            <h6>{item.lon}</h6>
            <button onClick={() => {
              showData(); 
              changeStartAndEnd(item.lat, item.lon);
            }}>
              Direction
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Attributes;
