import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const HistoryPage = ({historyStory}) => {

    return (
        <>
            <Header />
            <h4 id="historyTitle">Choose a card to read an epic tale in the history of greenstone bouldering</h4>
            <section id="historySection">
                {/* map over history stories to display cards on screen */}
                {historyStory.map((story) => 
                    <>
                        <Link to={`/history/${story.title}`} className="imgCard">
                            <div className="textOverlay"> {story.title} </div>
                            <img src={`/images/history_images/${story.imgLink}.png`} alt={`${story.title} screenshot`} className="imgCardImg"></img>
                        </Link>
                    </>
                )}
            </section>
            <Footer />
        </>
    )
};

export default HistoryPage;
