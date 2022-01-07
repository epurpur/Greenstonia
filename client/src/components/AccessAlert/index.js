import React from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const AccessAlert = () => {

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
            {currentSeason === 'winter' && (
                <>
                    <div id='red-alert'>
                        <p>The Blue Ridge Parkway is potentially closed in winter. Check the following for more information: <a href="https://www.nps.gov/blri/planyourvisit/roadclosures.htm" target="_blank" rel="noreferrer">https://www.nps.gov/blri/planyourvisit/roadclosures.htm</a></p>
                    </div>
                </>
            )}
            {currentSeason !== 'winter' && (
                <>
                    <div id='green-alert'>
                        <p>No access alerts today!</p>
                    </div>
                </>
            )}
        </>
    )
};

export default AccessAlert;
