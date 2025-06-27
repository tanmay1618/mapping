import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "../data/jharkhand.geojson.js";
import rainfallData from "../data/rainfall.js";
import vegetationData from "../data/vegetation.js";

const JharkhandRainfallMap = () => {
  const [features, setFeatures] = useState([]);
  const [dataType, setDataType] = useState("rainfall"); 

  useEffect(() => {
    // Merge rainfall data with GeoJSON
    const mergedFeatures = geoData.features.map((feature) => {
    const district = (feature.properties.Dist_Name || "").toLowerCase().trim();

    let matchedData;
    if (dataType === "rainfall") {
      matchedData = rainfallData.find(d => d.Dist_Name === district);
      feature.properties.value = matchedData ? matchedData.rainfall : 0;
    } else {
      matchedData = vegetationData.find(d => d.Dist_Name === district);
      feature.properties.value = matchedData ? matchedData.vegetation : 0;
      console.log(feature.properties.value)
    }

    return feature;
  });

  setFeatures(mergedFeatures);
}, [dataType]); 

  // Color based on rainfall
const getRainfallColor = (d) => {
  return d > 1100 ? "#08306b" :
         d > 1000 ? "#2171b5" :
         d > 900  ? "#6baed6" :
         d > 800  ? "#c6dbef" :
                    "#eff3ff";
};

const getVegetationColor = (v) => {
  return v > 70 ? "#00441b" :     // Dense Forest
         v > 65 ? "#1b7837" :     // Moderate-Dense
         v > 55 ? "#5aae61" :     // Moderate
         v > 45 ? "#a6dba0" :     // Light
                  "#d9f0d3";      // Sparse
};

const style = (feature) => {
  const value = feature.properties.value || 0;

  return {
    fillColor: dataType === "rainfall" ? getRainfallColor(value) : getVegetationColor(value),
    weight: 1,
    opacity: 1,
    color: "black",
    fillOpacity: 0.7,
  };
};

  return (
    <div>
    {/* Toggle Button Above Map */}
    <div style={{ marginBottom: "10px", textAlign: "center" }}>
      <button
        onClick={() =>
          setDataType(dataType === "rainfall" ? "vegetation" : "rainfall")
        }
        style={{
          padding: "8px 16px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Show {dataType === "rainfall" ? "Vegetation" : "Rainfall"}
      </button>
    </div>
   <MapContainer center={[23.6102, 85.2799]} zoom={7} style={{ height: "800px", width: "100%" }}>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <GeoJSON
    data={{ ...geoData, features }}
    style={style}
    onEachFeature={(feature, layer) => {
      const name = feature.properties.Dist_Name || "Unknown";
      const value = feature.properties.value || "N/A";

      const tooltipLabel =
        dataType === "rainfall"
          ? `${name}: ${value} mm Rainfall`
          : `${name}: ${value}% Vegetation`;

      layer.bindTooltip(tooltipLabel, {
        sticky: true,
      });
    }}
  />
</MapContainer>

    </div>
  );
};

export default JharkhandRainfallMap;
