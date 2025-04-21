import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import LocationMarker from './LocationMarker'

const Map = ({ setStartPos, setEndPos, shortestPath }) => {
  const [isStartSet, setIsStartSet] = useState(false)
  const [centre, setCentre] = useState([29.3759181, 79.5293706])
  const [djskatra_data, set_djskatra_Data] = useState([])
  const [astar, set_astar_Data] = useState([])

  const handleSelect = (lat, lon) => {
    if (!isStartSet) {
      setStartPos([lat, lon])
      console.log("Start Position selected :", [lat, lon])
      setIsStartSet(true)
    } else {
      setEndPos([lat, lon])
      console.log("End Position selected :", [lat, lon])
      setIsStartSet(false)
    }
  }

  // 🔁 Listen for shortestPath prop updates
  useEffect(() => {
    if (shortestPath) {
      set_djskatra_Data(shortestPath.shortest_path_d)
      set_astar_Data(shortestPath.shortest_path_a)
      setCentre(shortestPath.shortest_path_d?.[0] || centre)
    }
  }, [shortestPath])

  return (
    <div>
      <MapContainer center={centre} zoom={16} style={{ height: '600px', margin: '20px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {djskatra_data.length > 1 && (
          <Polyline positions={djskatra_data} pathOptions={{ color: 'blue', weight: 4 }} />
        )}

        {astar.length > 1 && (
          <Polyline positions={astar} pathOptions={{ color: 'red', weight: 1 }} />
        )}

        <LocationMarker onSelect={handleSelect} />
      </MapContainer>
    </div>
  )
}

export default Map
