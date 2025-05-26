import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapView = () => {
    const position = [-1.2546, 36.8936]; //Nairobi, Kenya

  return (
    <div className="w-full h-[100vh] rounded-xl shadow overflow-hidden grid grid-cols-1 gap-6" >
      <MapContainer center={position} zoom={10} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You live here! <br /> Dandora,Nairobi
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
