import React, {useContext} from 'react'
import { Link } from 'react-router-dom';

const ActiveJobsCard = ({ id, createdAt, jobText, jobAuthor, location, duration, otherComments, comments }) => {

    console.log('ACTIVE CARD DATA ::::', id, comments)

    {/* Link to= WILL LINK TO SINGLE JOB PAGE (ex: /SingleJobPage/:id */}
    return (
            <Link to={{pathname: `/SingleJobPage/${id}`, 
                        state: { id:id, 
                                    createdAt:createdAt, 
                                    jobText:jobText, 
                                    jobAuthor:jobAuthor, 
                                    location:location, 
                                    duration:duration, 
                                    otherComments:otherComments,
                                    comments:comments}}} //comments are an array
                        className='jobCard' 
                        style={{ textDecoration: 'none' }}>
                <p> {jobText} </p>
                <p> Date: {createdAt} </p>
            </Link>
    )
}

export default ActiveJobsCard;

