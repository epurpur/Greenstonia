import timespan from 'jsonwebtoken/lib/timespan';
import React, { useState, useEffect } from 'react';

/* Components */

const WeatherComponent = () => {

    const [historicalWeatherData, sethistoricalWeatherData] = useState(null);

    useEffect(() => {

        // need to get UTC time for each of last two days
        // START HERE. Figure out how to get correct UTC timestamp
        const currentTimestamp = new Date().getTime();
        const yesterdayTimestamp = currentTimestamp - (24*60*60*1000);
        const twoDaysAgoTimestamp = currentTimestamp - 24*60*60*1000*2;

        console.log(yesterdayTimestamp, twoDaysAgoTimestamp);
    
        // API call to OpenWeatherMap for previous two days weather
        fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.8849&lon=78.8995&dt=${yesterdayTimestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log('HISTORICAL WEATHER DATA: ', data);
            })
    })

    return (
        <>
            <div id='weather'>Weather</div>
        </>
    )
};

export default WeatherComponent;
