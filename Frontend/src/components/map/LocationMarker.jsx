import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default LocationMarker;