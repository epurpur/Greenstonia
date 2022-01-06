import React from 'react';

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
            {currentSeason === 'winter' && (
                <>
                    <div id='red-alert'>
                        <p>It is possible the blue ridge parkway is currently closed</p>
                        <p>Please check the following for more information: <a href="https://www.nps.gov/blri/planyourvisit/roadclosures.htm" target="_blank" rel="noreferrer">https://www.nps.gov/blri/planyourvisit/roadclosures.htm</a></p>
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

            {/* <div id='alerts'>
                <h3>Alerts</h3>
                {currentSeason === 'winter' && (
                    <>
                        <h4>Current season: {currentSeason} </h4>
                        <p style={{"color":"purple"}}>It is possible the parkway is closed!</p>
                    </>
                )} 
                {currentSeason !== 'winter' && (
                    <h4> Current season: not winter</h4>
                )}

            </div> */}
            
            
        </>
    )
};

export default Alerts;
