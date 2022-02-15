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
    
    // making API call to database for boulders by area query, using area name of current area
    const { loading, data } = useQuery(QUERY_BOULDERSBYAREA, {variables: {areaName: areaData.areaName}});
    const bouldersByArea = data?.bouldersByArea || [];
    //sort boulders alphabetically by name
    bouldersByArea && console.log('BOULDERS BY AREA', bouldersByArea.boulders)
    
    // sort climbing areas alphabetically by name
    // need to make copy of climbingAreas array to do this
    // const arrayForSort = [...bouldersByArea.boulders]
    // const bouldersByName = arrayForSort.sort((a, b) => a.boulderName < b.boulderName ? -1 : (a.boulderName > b.boulderName ? 1 : 0))
    // bouldersByName && console.log('BOULDERS BY AREA SORTED', bouldersByName)

    const makeBoulderCards = () => {

        return bouldersByArea.boulders.map((boulder) =>
        (
            <p className='boulderCard'>testCard</p>
        ))
    }


    return( 
        <> 
            <Header />
            <div id="areaHolder">
                <div id="areaInfo">
                    <p>Area Name: {bouldersByArea && bouldersByArea.areaName} </p>
                    <p>Area Description: {bouldersByArea && bouldersByArea.areaDescription} </p>
                    <p>Parking Description: {bouldersByArea && bouldersByArea.parkingDescription} </p>
                    <div>Search Boulders by Name</div>
                        <div id="boulderCardHolder">
                            {bouldersByArea && makeBoulderCards()}
                        </div>
                        {/* <div id="boulderCardHolder">
                        {bouldersByArea && bouldersByArea.boulders.map((boulder) =>
                        // create card for each boulder. These are sorted alphabetically by name
                            (
                                ///// START HERE /////
                                //this should be a link to route page
                                <p className='boulderCard'>{boulder.boulderName}</p>
                            )
                        )}
                        </div> */}
                </div>
                <div id="boulderMap">
                    <MapContainer center={[37.95, -78.98]} zoom={11.25} scrollWheelZoom={false}>
                        Google Maps basemap as TileLayer
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
