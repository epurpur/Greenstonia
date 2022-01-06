import React from 'react'

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

/* Images */ 
import mustang_boulder_img from '../../images/mustang_boulder.png';


const RoutesPage = () => {
    return (
        <>
            <Header />
            <h2> Mustang Boulder </h2>
            <p> Mustang boulder description </p>
            <div id="imgHolder">
                Image goes here
                {/* <img src={mustang_boulder_img} alt="image of mustang boulder"></img> */}
            </div>
            <p> List of routes on boulder </p>
            <ul>
                <Link to="/singleRoute"><li>Dragonball GT</li></Link>
                <Link to="/singleRoute"><li>Supercharger</li></Link>
                <Link to="/singleRoute"><li>Super Snake</li></Link>
                <Link to="/singleRoute"><li>Top Flite</li></Link>
            </ul>
            <Footer />
        </>
    )
}

export default RoutesPage;
