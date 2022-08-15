import React, { useState } from 'react';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const HistoryPage = () => {

    const [historyStory, setHistoryStory] = useState([
        {
            id: 1,
            title: 'Barry Condron history',
            active: true,
            info: `this is test info`,
            imgLink: 'barrycondron'
        },
        {
            id: 2,
            title: 'Elliot Gaunt 12.2',
            active: true,
            info: `more test info`,
            imgLink: 'elliotgaunt'
        },
        {
            id: 3,
            title: 'Brad Ausink 12.2',
            active: true,
            info: 'Brad Ausink story',
            imgLink: 'bradausink'
        },
        {
            id: 4,
            title: 'Matt Behrens story',
            active: true,
            info: 'Matt Behrens Story',
            imgLink: 'mattbehrens'
        },
        {
            id: 5,
            title: 'Matt Fanning story',
            active: true,
            info: 'Matt Fanning Story',
            imgLink: 'mattfanning'
        },
        {
            id: 6,
            title: 'Dave Cohen FA of Life After Greenstone',
            active: true,
            info: 'dave cohen story of life after greenstone',
            imgLink: 'davecohen'
        },
        {
            id: 7,
            title: 'Andrew Cassidy FA of Mycotic Break',
            active: true,
            info: 'Andrew Cassidy story of Mycotic Break',
            imgLink: 'andrewcassidy'
        },
        {
            id: 8,
            title: 'Parker Smith story',
            active: true,
            info: 'Parker Smith Story',
            imgLink: 'parkersmith'
        },
        {
            id: 9,
            title: 'Ross Elliot FA of Super Duper Snake',
            active: true,
            info: 'Ross Elliot FA of Super Duper Snake',
            imgLink: 'rosselliot'
        },
        {
            id: 10,
            title: 'Erich Purpur more 12.2 FAs',
            active: true,
            info: 'Story of some more of the FAs on the 12.2 boulder',
            imgLink: 'erichpurpur'
        },
        {
            id: 11,
            title: 'Tommy Meriwether story',
            active: true,
            info: 'Tommy Meriwether story',
            imgLink: 'tommymeriwether'
        },
        {
            id: 12,
            title: 'Mike Farnsworth story',
            active: true,
            info: 'Mike Farnsworth Story',
            imgLink: 'mikefarnsworth'
        },
        {
            id: 13,
            title: 'Tyler Hogan story',
            active: true,
            info: 'Tyler Hogan Story',
            imgLink: 'tylerhogan'
        },
    ])

    return (
        <>
            <Header />
            <h4>Choose a card to see a story in the history of greenstone bouldering</h4>
            <section>
                {/* map over history stories to display cards on screen */}
                {historyStory.map((story) => 
                    <img className="imgCard" src={`/images/history_images/${story.imgLink}.png`} alt={`${story.title} screenshot`}></img>
                )}
            </section>
            <Footer />
        </>
    )
};

export default HistoryPage;
