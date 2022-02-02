import React from 'react';
import { useLocation } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const AreasPage = () => {
    
    // START HERE. WHY CANT I USE useLocation();?
    let data = useLocation();
    console.log('STATE', data.state);
    
    return( 
        <> 
            <Header />
            <h1>Areas Page</h1>
            <Footer />
        </> 
    );
};

export default AreasPage;
