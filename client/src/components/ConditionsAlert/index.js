import React from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const ConditionsAlert = () => {

    const conditions = 'good';

    return (
        <>
            {conditions === 'good' && (
                <>
                    <div id='conditions-good'>
                        <p>The conditions are good today</p>
                    </div>
                </>
            )} 
            {conditions === 'medium' && (
                <>
                    <div id='conditions-medium'>
                        <p>The conditions are medium today</p>
                    </div>
                </>
            )}
            {conditions === 'bad' && (
                <>
                    <div id='conditions-bad'>
                        <p>The conditions are bad today</p>
                    </div>
                </>
            )}  
        </>
    )
}

export default ConditionsAlert;
