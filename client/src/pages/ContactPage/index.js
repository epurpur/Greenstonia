import React from 'react';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* Images */
import erichpic from '../../images/erichpic.png';

/* CSS styles */
import "./styles.css";

const ContactPage = () => {
    return (
        <>
            <Header />
            <div id="contactContainer">
                <div id='authorBio'> 
                    <h2>About Me</h2>
                    <p>
                        This project has been really fun for me to combine my interests in our local rock climbing as well as to keep up my web development skills. Though a bit off the beaten path of destination climbing areas like the New River Gorge or Chattanooga, 
                        the greenstone of Central Virginia offers plenty of climbing and natural beauty in the Appalachian Mountains.  I hope you use this resource to enjoy the great bouldering that Central Virginia's Blue Ridge Parkway has to offer! 
                    </p>
                    <p>
                        I grew up in Boone, NC and started climbing in 2005 while a freshman at Appalachian State University. There was no gym so I cut my teeth at Boone's local areas, primarily Blowing Rock Boulders. 
                        Climbing hooked me right away and since then I have climbed extensively around the country and quite a few international destinations. I enjoy bouldering, sport, and trad climbing equally.
                        I moved to Charlottesville in 2017 and have thoroughly enjoyed the process of exploring the Parkway for new areas, repeating established routes, and leaving our own mark on the rocks.
                    </p>
                    <p>
                        In my free time when I am not climbing at one of our local areas, you'll find me running trail running, learning a foreign language, trying a new recipe, 
                        doing projects around my house, skiing, traveling, or reading a good book. 
                    </p>
                    <p>
                        I would like to thank all those who helped to find, develop, and climb around Central Virginia. You know who you are. The small but tight knit local climbing community has led to making great memories on the rocks and lasting friendships that I am very grateful for.
                    </p>
                    <p>
                        *******TO DO: LEAVE CONTACT INFORMATION*******
                    </p>

                </div>
                <div id="pictureHolder">
                    <img id="erichpic" src={erichpic}/>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ContactPage;
