import React from 'react'

//css styles from landing component css
import '../../pages/LandingPage/styles.css'

const WorkerCard = ( {username, email, phoneNumber, description} ) => {
    return (
        <div id="singleJobCard">
            <p>Name: {username}</p>
            <p>Email: {email}</p>
            <p>Phone: {phoneNumber}</p>
            <p>Other Information: {description}</p>
        </div>
    )
}

export default WorkerCard;
