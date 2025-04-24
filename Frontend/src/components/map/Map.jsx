
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import LocationMarker from './LocationMarker'

const Map = ({ setStartPos, setEndPos, shortestPath ,
  search_value_st ,
  set_search_value_st,
  search_value_end ,
  set_search_value_end, }) => {
  const [centre, setCentre] = useState([29.3759181, 79.5293706])
  const [djskatra_data, set_djskatra_Data] = useState([])
  const [astar, set_astar_Data] = useState([])
  // const [data,set_data] = useState([])

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (shortestPath) {
      set_djskatra_Data(shortestPath.shortest_path_d || [])
      set_astar_Data(shortestPath.shortest_path_a || [])
      setCentre(shortestPath.shortest_path_d?.[0] || centre)
    }
  }, [shortestPath]);

  // Ensure djskatra_data has at least 2 points before trying to render markers
  const hasValidData = djskatra_data.length > 1;
  

  return (
    <div>
      
      <MapContainer center={centre} zoom={16} style={{ height: '700px'}}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hasValidData && (
          <>
            <Polyline positions={djskatra_data} pathOptions={{ color: 'blue', weight: 4 }} />
            
            {/* Start marker */}
            <Marker position={djskatra_data[0]}>
              <Popup>Start</Popup>
            </Marker>

            {/* End marker */}
            <Marker position={djskatra_data[djskatra_data.length - 1]} icon={redIcon}>
              <Popup>End</Popup>
            </Marker>
          </>
        )}

        {astar.length > 1 && (
          <Polyline positions={astar} pathOptions={{ color: 'red', weight: 1 }} />
        )}
        <LocationMarker setStartPos={setStartPos} setEndPos={setEndPos}  search_value_st ={search_value_st}
            set_search_value_st={set_search_value_st}
            search_value_end ={search_value_end}
            set_search_value_end={set_search_value_end} />
      </MapContainer>
    </div>
  )
}
export default Map


   
   