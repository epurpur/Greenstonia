import React from 'react';

/* Components */
import Header from "../../components/Header";

/* CSS styles */
import "./styles.css";

/* Images */
import star_img from "../../images/star.png";


const SingleRoutePage = () => {
    return (
        <>
            <Header />
            <h2> SuperCharger </h2>
            <div> Grade: v7</div>
            <div> Quality: 3 stars </div>
            <div> First Ascent: Jacob Schierman </div>
            <div> Description: blah blah blah </div>
            <div id="singleRoutePhoto"> Photo goes here </div>
            <div id="singleRouteVideo"> Video goes here </div>
        </>
    )
}

export default SingleRoutePage;
