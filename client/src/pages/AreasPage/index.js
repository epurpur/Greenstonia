import React from 'react';
import { useLocation } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
                </div>
                <div>
                    Map goes here
                </div>
            </div>
            <Footer />
        </> 
    );
};

export default AreasPage;
