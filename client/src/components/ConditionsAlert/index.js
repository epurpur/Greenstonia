import React from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const ConditionsAlert = (props) => {

    return (
        <>
            {props.todayWeatherData === 'cold' && (
                <>
                    <div id='conditions-cold'>
                        <p>The conditions are cold today</p>
                    </div>
                </>
            )} 
            {props.todayWeatherData === 'good' && (
                <>
                    <div id='conditions-good'>
                        <p>The conditions are good today</p>
                    </div>
                </>
            )}
            {props.todayWeatherData === 'hot' && (
                <>
                    <div id='conditions-hot'>
                        <p>The conditions are hot today</p>
                    </div>
                </>
            )}  
            {props.todayWeatherData === 'unavailable' && (
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
