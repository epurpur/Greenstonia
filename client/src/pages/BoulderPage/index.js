import React from 'react'

/* Components */
import Header from "../../components/Header";
import BouldersMap from "../../components/BouldersMap";
import BouldersList from '../../components/BouldersList';

/* CSS styles */
import "./styles.css";

const BoulderPage = () => {
    return (
        <>            
            <Header />
            <h2> Mustang Boulder Area </h2>
            <BouldersMap />
            <BouldersList />
        </>
    )
}

export default BoulderPage;
