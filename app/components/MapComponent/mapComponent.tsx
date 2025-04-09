import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapComponent() {
  useEffect(() => {
    console.log(window.innerWidth);
  }, []);
  return (
    <MapContainer 
      center={[35.2705877, -81.104609]} 
      zoom={11} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[35.2705877, -81.104609,]}>
        <Popup>
          Charlotte, NC<br />Our service area
        </Popup>
      </Marker>
    </MapContainer>
  );
}
