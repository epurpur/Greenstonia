import React, {useState} from 'react';
import { Link } from "react-router-dom";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* Images */
import erichpic from '../../images/erichpic.png';
import linkedIn from '../../images/linkedin.png';
import email from '../../images/email.png';
import github from '../../images/github.png';

/* CSS styles */
import "./styles.css";

const ContactPage = () => {

    const [contactInfo, setContactInfo] = useState([
        {
            id: 1,
            title: 'LinkedIn',
            href: 'https://www.linkedin.com/in/erich-purpur-140a1433/',
            imgSrc: linkedIn,
            alt: 'LinkedIn logo',
            target: '_blank'
        },
        {
            id: 2,
            title: "Email",
            href: "mailto:epurpur@gmail.com",
            imgSrc: email,
            alt: "email link with letter icon",
            target: '_blank'
        },
        {
            id: 3,
            title: 'Github',
            href: 'https://github.com/epurpur/Greenstonia',
            imgSrc: github,
            alt: 'github icon',
            target: '_blank'
        }
    ]);

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
                        I grew up in Boone, NC and started climbing in 2005 while a freshman at Appalachian State University. A friend took me to Blowing Rock Boulders one day and soon after I was hooked. In the beginning I mostly climbed around Boone's local areas
                        and eventually beyond to places like the Linville Gorge, Rumbling Bald, and New River Gorge. Since then I have climbed extensively around the country and at quite a few international destinations. 
                        I enjoy bouldering, sport, and trad climbing equally. I moved to Charlottesville in 2017 and have thoroughly enjoyed the process of repeating established routes, exploring the Parkway for new areas, and leaving our own mark on the rocks.
                    </p>
                    <p>
                        I work at the University of Virginia and in my free time when I am not climbing you'll find me trail running, learning a foreign language, trying a new recipe, 
                        doing projects around my house, skiing, traveling, or reading a good book. 
                    </p>
                    <p>
                        I would like to thank all those who helped to find, develop, and climb around Central Virginia. You know who you are. The small but tight knit local climbing community has led to making great memories on the rocks and lasting friendships that I am very grateful for.
                    </p>
                    <p id='contact'>
                        If you'd like to get in touch with me...
                        <div id="contact-links">
                            {/* Render each contact item from contactItem array */}
                            {contactInfo.map((item) =>
                                (<a key={item.id} href={item.href} target={item.target}><img src={item.imgSrc} alt={item.alt} className="link"></img></a>)
                            )}
                        </div>
                    </p>

                </div>
                <div id="pictureHolder">
                    <img id="erichpic" src={erichpic} alt="picture of erich purpur"/>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ContactPage;
