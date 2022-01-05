import React from 'react'

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

const BouldersMap = () => {
    return (
        <>
            <div id='mapTitleText'>Search Boulders by Map</div>
            <MapContainer center={[37.95, -78.98]} zoom={10.5} scrollWheelZoom={false}>
                {/* Google Maps basemap as TileLayer */}
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                  <Marker position={[37.95, -78.88]}>
                    <Popup>
                        <h2>Incredibles Boulder</h2>
                        <Link to="/routes">Click to view routes</Link>
                    </Popup>
                  </Marker>
                  <Marker position={[37.95, -78.98]}>
                    <Popup>
                        <h2>Mustang Boulder</h2>
                        <Link to="/routes">Click to view routes</Link>
                    </Popup>
                  </Marker>
            </MapContainer>        
        </>
    )
}

export default BouldersMap;
