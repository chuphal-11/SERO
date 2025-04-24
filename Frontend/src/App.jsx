import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/map/Map.jsx';
import Navbar from './components/Navbar.jsx';
import Coordinates from './components/Coordinates.jsx';

function App() {
  const [startPos, setStartPos] = useState(null);
  const [shortestPath, setShortestPath] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [show_data, set_data] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [search_value_st,set_search_value_st] = useState('')
  const [search_value_end, set_search_value_end] = useState('')
  const togglePanel = () => setIsPanelOpen(prev => !prev);
  
  return (
    <>
          <Coordinates
            set_data={set_data}
            data={show_data}
            startPos={startPos}
            endPos={endPos}
            setStartPos={setStartPos}
            setEndPos={setEndPos}
            setShortestPath={setShortestPath}
            search_value_st ={search_value_st}
            set_search_value_st={set_search_value_st}
            search_value_end ={search_value_end}
            set_search_value_end={set_search_value_end}
          />
       

        <Map
          setStartPos={setStartPos}
          setEndPos={setEndPos}
          shortestPath={shortestPath}
          search_value_st ={search_value_st}
          set_search_value_st={set_search_value_st}
          search_value_end ={search_value_end}
          set_search_value_end={set_search_value_end}
        />
     
    </>
  );
}

export default App;
