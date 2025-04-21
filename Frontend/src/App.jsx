import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Map  from './components/map/Map.jsx'
import Navbar from './components/Navbar.jsx'
import Coordinates from './components/Coordinates.jsx'
function App() {
  const [startPos, setStartPos] = useState(null);
  const [shortestPath, setShortestPath] = useState(null);
  console.log("shortestPath", shortestPath)
  const [endPos, setEndPos] = useState(null);
  console.log("Start Position new:", startPos)
  console.log("End Position new:", endPos)
  return (
    <>
      <Navbar/>
      <Coordinates startPos={startPos} endPos={endPos} setShortestPath={setShortestPath} />
      <Map  setStartPos={setStartPos} setEndPos={setEndPos} shortestPath={shortestPath} />
    </>
  )
}

export default App
