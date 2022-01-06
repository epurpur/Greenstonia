import React, { useState } from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const Alerts = () => {

    // Get current month and translate into season
    const today = new Date();  // Date() object is JS built-in
    const currentMonth = today.getMonth();
    let currentSeason = '';
    // If current month is January, February, March, December there is potential for Blue Ridge Parkway to be closed
    if (currentMonth === 0 || currentMonth === 1 || currentMonth === 2 || currentMonth === 3 || currentMonth === 11) {
        currentSeason = 'winter'
    }

    


    return (
        <>
            <div id='alerts'>
                <h3>Alerts</h3>
                {currentSeason === 'winter' && (
                    <>
                        <h4>Current season: {currentSeason} </h4>
                        <p>It is possible the parkway is closed!</p>
                    </>
                )} 
                {currentSeason !== 'winter' && (
                    <h4> Current season: not winter</h4>
                )}

            </div>
            
            
        </>
    )
};

export default Alerts;
