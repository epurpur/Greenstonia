import React from 'react';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

const AreasMap = () => {
    return (
        <>
            <div id='mapTitleText'>Search Areas by Map</div>
            <MapContainer center={[37.95, -78.98]} zoom={11.25} scrollWheelZoom={false}>
                {/* Google Maps basemap as TileLayer */}
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                  <Marker position={[37.95, -78.93]}>
                    <Popup>
                        <h2>Mustang Boulder</h2>
                        <Link to="/boulder">Click to view area</Link>
                    </Popup>
                  </Marker>
            </MapContainer>
        </>
    )
};

export default AreasMap;
