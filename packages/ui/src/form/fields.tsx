"use client";
import { LocationOn } from "@mui/icons-material";
import { TextField, MenuItem, Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib3NhbXUtYmxhY2siLCJhIjoiY2thNTVhcmxsMGp5dzNmb2FkZ252dGI2MiJ9.wlZMdei2diDAeeKAfc8YtQ";

const MapPicker = ({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  zoom,
  setZoom,
}: {
  latitude: number;
  setLatitude: (value: number) => void;
  longitude: number;
  setLongitude: (value: number) => void;
  zoom: number;
  setZoom: (value: number) => void;
}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLongitude(map.current.getCenter().lng.toFixed(4));
      setLatitude(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "rgb(35 55 75 / 90%)",
          color: "#fff",
          padding: "6px 12px",
          fontFamily: "monospace",
          zIndex: "1",
          margin: "1rem 0",
          borderRadius: "4px",
        }}
      >
        Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
      </Box>
      <div className="" style={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-150%)",
          }}
        >
          <LocationOn color="error" />
        </Box>
        <div ref={mapContainer} className="map-container"></div>
      </div>
    </Box>
  );
};

export { TextField, MenuItem, MDEditor, MapPicker };
