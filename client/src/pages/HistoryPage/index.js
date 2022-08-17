import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const HistoryPage = () => {

    const [historyStory, setHistoryStory] = useState([
        {
            id: 1,
            title: 'Birth of Greenstone Bouldering',
            active: true,
            info: `this is test info`,
            imgLink: 'barrycondron',
            author: 'Barry Condron'
        },
        {
            id: 2,
            title: 'Blue Ridge Beauty',
            active: true,
            info: `more test info`,
            imgLink: 'elliotgaunt',
            author: 'Elliot Gaunt'
        },
        {
            id: 3,
            title: 'A Long Way from Thailand',
            active: true,
            info: 'Brad Ausink story',
            imgLink: 'bradausink',
            author: 'Brad Ausink'
        },
        {
            id: 4,
            title: "Straight from the horse's mouth",
            active: true,
            info: 'Matt Behrens Story',
            imgLink: 'mattbehrens',
            author: 'Matt Behrens'
        },
        {
            id: 5,
            title: 'The skyline drive rennaisance',
            active: true,
            info: 'Matt Fanning Story',
            imgLink: 'mattfanning',
            author: 'Matt Fanning'
        },
        {
            id: 6,
            title: 'Life After Greenstone',
            active: true,
            info: 'dave cohen story of life after greenstone',
            imgLink: 'davecohen',
            author: 'Dave Cohen'
        },
        {
            id: 7,
            title: 'Mycotic Break',
            active: true,
            info: 'Andrew Cassidy story of Mycotic Break',
            imgLink: 'andrewcassidy',
            author: 'Andrew Cassidy'
        },
        {
            id: 8,
            title: 'Parker Smith story',
            active: true,
            info: 'Parker Smith Story',
            imgLink: 'parkersmith',
            author: 'Parker Smith'
        },
        {
            id: 9,
            title: 'Super Duper Snake',
            active: true,
            info: 'Ross Elliot FA of Super Duper Snake',
            imgLink: 'rosselliot',
            author: 'Ross Elliott'
        },
        {
            id: 10,
            title: 'Filling in the lines',
            active: true,
            info: 'Story of some more of the FAs on the 12.2 boulder',
            imgLink: 'erichpurpur',
            author: 'Erich Purpur'
        },
        {
            id: 11,
            title: 'Lockdown bushwhacking',
            active: true,
            info: 'Peter Malander story',
            imgLink: 'petermalander',
            author: 'Peter Malander'
        },
        {
            id: 13,
            title: 'Tyler Hogan story',
            active: true,
            info: 'Tyler Hogan Story',
            imgLink: 'tylerhogan',
            author: 'Tyler Hogan'
        },
        {
            id: 13,
            title: 'Mike Farnsworth story',
            active: true,
            info: 'Mike Farnsworth story',
            imgLink: 'mikefarnsworth',
            author: 'Tyler Hogan'
        },
    ])

    return (
        <>
            <Header />
            <h4 id="historyTitle">Choose a card to see a story in the history of greenstone bouldering</h4>
            <section id="historySection">
                {/* map over history stories to display cards on screen */}
                {historyStory.map((story) => 
                    <>
                        <Link to="/home" className="imgCard">
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
