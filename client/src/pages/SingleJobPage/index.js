import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SingleJobCard from '../../components/SingleJobCard';

// styles
import './styles.css';


const SingleJob = ( {userType} ) => {
    
    return (
        <div>
            {userType === 'contractor' ? 
            //If userType === 'contractor, show contractor view of single job
            <>
                <section id="singleJob">
                    <SingleJobCard />
                    <div id='applicants'>
                        Show applicant cards here
                    </div>
                </section>
                <br></br>
                <div id='linkHolder'>
                    <Link class='links' style={{ textDecoration: 'none' }}>Edit Job</Link>
                    <Link class='links' style={{ textDecoration: 'none' }}>Delete Job</Link>
                </div>
            </>
            : 
            // else if userType === 'worker', show worker view of single job
            <>
                <section id="singleJob">
                    <SingleJobCard />
                </section>
                
            </>}
        </div>
    )
}

export default SingleJob;
