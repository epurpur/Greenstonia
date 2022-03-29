import React from 'react';
import { Link, useLocation } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

/* Images */
import star_img from "../../images/star.png";


const SingleRoutePage = () => {

    let singleRouteData = useLocation();
    singleRouteData = singleRouteData.state;
    console.log('SINGLE ROUTE DATA', singleRouteData);

    return (
        <>
            <Header />
            <p id="breadcrumb">Go Back: <Link to={{pathname: `/boulder/${singleRouteData.boulderName}`, state: {key: singleRouteData.boulderID, boulderID: singleRouteData.boulderID, boulderName: singleRouteData.boulderName, areaName: singleRouteData.areaName }}}>{singleRouteData.boulderName}</Link></p>
            <h2> {singleRouteData.routeName} </h2>
            <div> Grade: {singleRouteData.routeGrade} </div>
            <div> Quality: {singleRouteData.routeQuality} stars </div>
            <div> First Ascent: {singleRouteData.firstAscent} </div>
            <div> Description: {singleRouteData.routeDescription} </div>
            <div id="singleRoutePhoto"> Photo goes here </div>
            <div id="singleRouteVideo"> Video goes here </div>
            <Footer />
        </>
    )
}

export default SingleRoutePage;
