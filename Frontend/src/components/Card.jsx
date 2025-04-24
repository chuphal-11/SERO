import React, { useEffect, useState } from 'react';

const Card = ({ data, changest_end, showData, search_value_st ,
  set_search_value_st,
  search_value_end ,
  set_search_value_end, }) => {
  console.log("----",data)
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px", width:"" }}>
      <h3>{data.name}</h3>
      <p><strong>Address:</strong> {data.address}</p>
      <button onClick={() => {
        showData(data.lat, data.lon);
        changest_end(data.lat, data.lon);
        set_search_value_end(data.address)
        set_search_value_st('your location')
      }}>
        Direction
      </button>
    </div>
  );
};

export default Card;
