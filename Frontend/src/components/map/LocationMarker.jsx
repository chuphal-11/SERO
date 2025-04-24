import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function LocationMarker({ setStartPos, setEndPos, search_value_st ,
  set_search_value_st,
  search_value_end ,
  set_search_value_end, }) {
  const [position, setPosition] = useState(null);
  const [isStartSet, setIsStartSet] = useState(false);
  const [buttonText, setButtonText] = useState("Set as Start Position");

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const selected = [lat, lng];
      setPosition(selected);

      if (!isStartSet) {
        // setStartPos(selected);
        console.log("Start Position set:", selected);
        // setIsStartSet(true);
      } else {
        // setEndPos(selected);
        console.log("End Position set:", selected);
      }
    },
  });

  const handleButtonClick = () => {
    
      setStartPos(position);
      console.log("Start Position set:", position);
      set_search_value_st(position)
      setIsStartSet(true);
      // setButtonText("Set as End Position");
    } 
  const handle_end = () =>{
      setEndPos(position);
      set_search_value_end(position)
      console.log("End Position set:", position);
      // setButtonText("Location Set");
  }
   
  // const handleRemovePopup = () => {
  //   if (popup) {
  //     popup.remove();  // Close the popup
  //     console.log("Popup removed");
  //   }
  // };
  return position ? (
    <Marker position={position}>
      <Popup>
        <button onClick={handleButtonClick}>{buttonText}</button>
        <button  onClick={handle_end}>set as end position</button>
        {isStartSet ? "End Position Selected" : "Start Position Selected"}
      </Popup>
    </Marker>
  ) : null;
}

export default LocationMarker;
