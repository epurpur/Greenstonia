import React from 'react';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/* CSS styles */
import "./styles.css";

const MapComponent = () => {
    return (
        <>
            <div id='mapTitleText'>Search by Map</div>
            <MapContainer center={[37.95, -78.98]} zoom={10.5} scrollWheelZoom={false}>
                {/* Google Maps basemap as TileLayer */}
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                  <Marker position={[37.95, -78.98]}>
                    <Popup>
                         Map Centroid
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
};

export default MapComponent;
