import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_BOULDERSBYAREA } from '../../utils/queries';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


/* CSS styles */
import "./styles.css";

const AreasPage = () => {
    
    // data passed in as state from RouteList component on homepage
    // this is used for the current area's name which is accesses by areaData.areaName
    let areaData = useLocation();
    areaData = areaData.state;
    
    // I THINK WHAT I NEED TO DO HERE IS NOW MAKE ANOTHER API REQUEST FOR BOULDERS IN THIS SPECIFIC AREA
    // START HERE. MAKE NEW API REQUEST FOR QUERY bouldersbyarea.
    // NEED TO INCLUDE THIS IN THE UTILS AND WHATNOT
    const { loading, data:bouldersByArea } = useQuery(QUERY_BOULDERSBYAREA, {variables: {areaName: areaData.areaName}});
    // const newArea = data?.bouldersByArea || [];
    console.log('New Boulders by AreaX', bouldersByArea.bouldersByArea);

    return( 
        <> 
            <Header />
            <div id="areaHolder">
                <div id="areaInfo">
                    <p>Area Name: {bouldersByArea.bouldersByArea.areaName} </p>
                    <p>Area Description: {bouldersByArea.bouldersByArea.areaDescription} </p>
                    <p>Parking Description: {bouldersByArea.bouldersByArea.parkingDescription} </p>
                    <div>Search Boulders by Name</div>
                        <div id="boulderCardHolder">
                        {bouldersByArea.bouldersByArea.boulders.map((boulder) =>
                            (
                                <p key={boulder._id} className='boulderCard'>{boulder.boulderName}</p>
                            )
                        )}
                        </div>
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
