import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createDivIcon = (icon) =>
  L.divIcon({
    html: ReactDOMServer.renderToString(icon),
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

const DeliveryTracker = () => {
  const homePosition = [28.4589, 77.0030];
  const [vehiclePos, setVehiclePos] = useState([28.4517274, 76.962187]); // Start from here

const pathCoords = [
  [28.4517274, 76.962187],  // Start – near Dwarka Expressway (Gurgaon branch)
  [28.4525,    76.9670],
  [28.4533,    76.9715],
  [28.4541,    76.9760],
  [28.4549,    76.9805],
  [28.4557,    76.9850],
  [28.4565,    76.9895],
  [28.4573,    76.9940],
  [28.4581,    76.9985],
  [28.4589,    77.0030],    // End – further along the expressway
];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= pathCoords.length) {
        clearInterval(interval);
        return;
      }
      setVehiclePos(pathCoords[i]);
      i++;
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={homePosition} zoom={15} style={{ height: "90vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={homePosition} icon={createDivIcon(<FaHome style={{ color: "blue", fontSize: "24px" }} />)} />

      <Marker
        position={vehiclePos}
        icon={createDivIcon(<FaMapMarkerAlt style={{ color: "red", fontSize: "24px" }} />)}
        ref={useRef()}
      />

      <Polyline positions={pathCoords} color="blue" />
    </MapContainer>
  );
};

export default DeliveryTracker;