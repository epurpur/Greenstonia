import React from 'react';
import { Link, useLocation } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import BouldersMap from "../../components/BouldersMap";
import BouldersList from '../../components/BouldersList';
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const BoulderPage = () => {

    // data passed in as state from AreasPage component
    // this is used for the current boulder's name and id number which is accessed by boulderData.state
    let boulderData = useLocation();
    boulderData = boulderData.state;

    // make API call to database for routes for this particular boulder, using ID of current boulder
    

    return (
        <>            
            <Header />
            <h2> Mustang Boulder </h2>
            <p> Area description </p>
            <BouldersMap />
            <BouldersList />
            <Footer />
        </>
    )
}

export default BoulderPage;
