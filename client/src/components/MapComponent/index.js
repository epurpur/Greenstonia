import React from 'react';

/* Components */
import { MapContainer, TileLayer } from 'react-leaflet';

/* CSS styles */
import "./styles.css";

const MapComponent = () => {
    return (
        <>
            <MapContainer center={[37.95, -78.98]} zoom={11} scrollWheelZoom={false}>
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
            </MapContainer>
        </>
    )
};

export default MapComponent;
