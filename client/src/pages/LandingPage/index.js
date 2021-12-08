import React from "react";
import { Link } from "react-router-dom";

/* CSS styles */
import "./styles.css";

/* Images */
import LandingImg from '../../images/LandingImg.png';

const LandingPage = () => {
  
    return (
        <section>
            <img src={LandingImg} alt="Scenic view of the mountains"></img>
            <section id='landingText'>
                <h1>Greenstonia</h1>
                <p>A guide to the bouldering of Central Virginia's Blue Ridge Parkway</p>
                <Link to="/home">
                    <button>Enter</button>
                </Link>
            </section>
        </section>
    );
  };
  
  export default LandingPage;