import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import 'leaflet/dist/leaflet.css';
import MapPlotting from "./components/MapPlotting"
import GoogleMapTracker from "./components/DeliveryTracker";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MapPlotting />} />
          <Route path="/map-tracker" element={<GoogleMapTracker/>} />
        </Routes>
    </Router>
  );
}

export default App;
