import React from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const ConditionsAlert = (props) => {

    console.log('PROPS: ', props.weatherData)
    // const conditions = 'good';

    return (
        <>
            {props.weatherData === 'cold' && (
                <>
                    <div id='conditions-cold'>
                        <p>The conditions are cold today</p>
                    </div>
                </>
            )} 
            {props.weatherData === 'good' && (
                <>
                    <div id='conditions-good'>
                        <p>The conditions are good today</p>
                    </div>
                </>
            )}
            {props.weatherData === 'hot' && (
                <>
                    <div id='conditions-hot'>
                        <p>The conditions are hot today</p>
                    </div>
                </>
            )}  
            {props.weatherData === 'unavailable' && (
                <>
                    <div id='conditions-unavailable'>
                        <p>Conditions are currently unavailable</p>
                    </div>
                </>
            )}
        </>
    )
}

export default ConditionsAlert;
