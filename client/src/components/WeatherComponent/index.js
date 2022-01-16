import React, { useState, useEffect } from 'react';

/* Components */

const WeatherComponent = () => {

    const [yesterdayWeather, setyesterdayWeather] = useState(null);
    const [twoDaysAgoWeather, settwoDaysAgoWeather] = useState(null);

    useEffect(() => {

        // need to get UTC time for each of last two days
        // START HERE. Figure out how to get correct UTC timestamp
        const currentTimestamp = new Date().getTime();
        console.log('currentTimestamp: ', currentTimestamp - (24*60*60*1000));
        let yesterdayTimestamp = currentTimestamp - (24*60*60*1000)
        let twoDaysAgoTimestamp = currentTimestamp - (24*60*60*1000*2);

        //need to remove last 3 digits of UTC timestamp and convert to integer
        yesterdayTimestamp = Math.floor(yesterdayTimestamp/1000);
        twoDaysAgoTimestamp = Math.floor(twoDaysAgoTimestamp/1000);
    
        // API call to OpenWeatherMap for yesterday's weather
        fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.8849&lon=-78.8995&dt=${yesterdayTimestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                // remember, there is a 24 hour hourly forecast. I am just taking weather at noon of requested day
                const dailyTemps = [];
                const dailyHumidity = [];
                const dailyWind = [];

                for (const hourlyWeather of data['hourly']) {
                    // add hourly measurements reading to dailyTemps
                    dailyTemps.push(hourlyWeather['temp']);
                    dailyHumidity.push(hourlyWeather['humidity']);
                    dailyWind.push(hourlyWeather['wind_speed']);
                }
                const hiTemp = Math.max(...dailyTemps).toFixed(2);  //toFixed = round to 2 decimal places
                const loTemp = Math.min(...dailyTemps).toFixed(2);
                
                // must write function to get avg humidity
                const getAverage = (array) => array.reduce((a,b) => a + b) / array.length
                const avgHumidity = getAverage(dailyHumidity).toFixed(2);
                const avgWind = getAverage(dailyWind).toFixed(2);


                console.log(hiTemp, loTemp, avgHumidity, avgWind);
            });

        // API call to OpenWeatherMap for two days ago weather
        // fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=38.0685&lon=-78.8895&dt=${twoDaysAgoTimestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         // remember, there is a 24 hour hourly forecast. I am just taking weather at noon of requested day
        //         console.log('TWO DAYS AGO WEATHER DATA: ', data);
        //     });


    })

    return (
        <>
            <div id='weather'>Weather</div>
        </>
    )
};

export default WeatherComponent;
