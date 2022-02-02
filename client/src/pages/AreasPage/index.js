import React from 'react';
import { Link, useLocation } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


/* CSS styles */
import "./styles.css";

const AreasPage = () => {
    
    // data passed in as state from RouteList component on homepage
    let areaData = useLocation();
    areaData = areaData.state;
    console.log('STATE OF AREA', areaData);
    console.log(areaData.areaName)
    
    return( 
        <> 
            <Header />
            <div id="areaHolder">
                <div id="areaInfo">
                    <p>Area Name: {areaData.areaName} </p>
                    <p>Area Description: {areaData.areaDescription} </p>
                    <p>Parking Description: {areaData.parkingDescription} </p>
                    <p>List of boulders in this area go here</p>
                </div>
                <div id="boulderMap">
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
                </div>
            </div>
            <Footer />
        </> 
    );
};

export default AreasPage;
