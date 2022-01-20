import React, { useState, useEffect } from 'react';

/* Components */

/* CSS styles */
import "./styles.css";

const WeatherComponent = () => {

    // state needed to get historical weather
    const [twoDaysAgoWeather, settwoDaysAgoWeather] = useState();
    const [yesterdayWeather, setyesterdayWeather] = useState();
    const [todayWeather, settodayWeather] = useState();
    const [tomorrowWeather, settomorrowWeather] = useState();
    const [inTwoDaysWeather, setinTwoDaysWeather] = useState();
    const [inThreeDaysWeather, setinThreeDaysWeather] = useState();
    const [inFourDaysWeather, setinFourDaysWeather] = useState(); 

    ///////////////////////////////////////////
    // Get timestamps for historical weather //
    ///////////////////////////////////////////

    // get UTC time for each of last two days
    const currentTimestamp = new Date().getTime();
    let yesterdayTimestamp = currentTimestamp - (24*60*60*1000)
    let twoDaysAgoTimestamp = currentTimestamp - (24*60*60*1000*2);

    // to remove last 3 digits of UTC timestamp and convert to integer
    yesterdayTimestamp = Math.floor(yesterdayTimestamp/1000);
    twoDaysAgoTimestamp = Math.floor(twoDaysAgoTimestamp/1000);

    ///////////////////////////////////////////
    // Make API calls for daily weather data //
    ///////////////////////////////////////////

    useEffect(() => {

        //Get historical weather data
        async function fetchHistoricalWeatherData(timestamp) {
            try{
                // API call to OpenWeatherMap
                let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=37.8849&lon=-78.8995&dt=${timestamp}&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`);
                let data = await response.json();
                let weatherData = parseHistoricalDailyWeather(data);

                if (timestamp === twoDaysAgoTimestamp) {
                    //set state of twoDaysAgoWeather to the dailyWeatherStats object returned from parseHistoricalDailyWeather
                    settwoDaysAgoWeather(weatherData);
                } else if (timestamp === yesterdayTimestamp) {
                    // set state of yesterdayWeather to the dailyWeatherStats object returned from parseHistoricalDailyWeather
                    setyesterdayWeather(weatherData);
                }
                
            } catch (err) {
                //if error, manually set weather data to 'n/a'
                let weatherData = {
                    "hiTemp":'n/a', 
                    "loTemp":'n/a', 
                    "humidity":'n/a', 
                    "wind":'n/a', 
                    "clouds":'n/a', 
                    "precip":'n/a'
                }

                if (timestamp === twoDaysAgoTimestamp) {
                    //set state of twoDaysAgoWeather to the dailyWeatherStats object returned from parseHistoricalDailyWeather
                    settwoDaysAgoWeather(weatherData);
                } else if (timestamp === yesterdayTimestamp) {
                    // set state of yesterdayWeather to the dailyWeatherStats object returned from parseHistoricalDailyWeather
                    setyesterdayWeather(weatherData);
                }
            }
        }

        // fetchHistoricalWeatherData(twoDaysAgoTimestamp);  //get weather two days ago
        // fetchHistoricalWeatherData(yesterdayTimestamp);   //get weather yesterday



        //Get future weather forecast data
        //START HERE//
        async function getWeatherForecast() {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=37.8849&lon=-78.8995&exclude=hourly,minutely&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
            let data = await response.json();
            // get just 'daily' key and just first 5 items from array (includes 7 day forecast but I only want 5 days)
            data = data['daily'].slice(0,-3);
            
            // make accumulator array to capture each day's daily weather object
            const dailyWeatherData = []
            
            for (let i of data) {

                //need to format precipitation data
                let dailyPrecip = i['rain'] + i['snow'];

                if (isNaN(dailyPrecip)) {
                    dailyPrecip = "0.00"
                    console.log('DailyPrecip', dailyPrecip)
                } else {
                    //convert mm to in
                    dailyPrecip = dailyPrecip * .0393701
                    //round to 2 decimal places
                    dailyPrecip = dailyPrecip.toFixed(2)
                    console.log("Daily Precipitation", dailyPrecip)
                }

                // create weather object for each day
                const oneDayWeather = {
                    "hiTemp": i['temp']['max'],
                    "loTemp": i['temp']['min'],
                    "humidity": i['humidity'],
                    "wind": i['wind_speed'],
                    "clouds": i['clouds'],
                    "precip": dailyPrecip,  //round to 2 decimal places. convert mm to in
                    "overall": i['weather'][0]['main']
                }
                
                // push weather object to dailyWeatherData array
                dailyWeatherData.push(oneDayWeather);
            }
                // set state for corresponding day with each object in dailyWeatherData array
                settodayWeather(dailyWeatherData[0]);
                settomorrowWeather(dailyWeatherData[1]);
                setinTwoDaysWeather(dailyWeatherData[2]);
                setinThreeDaysWeather(dailyWeatherData[3]);
                setinFourDaysWeather(dailyWeatherData[4]);
        }


        getWeatherForecast();

    }, []);


    const parseHistoricalDailyWeather = (dailyWeatherData) => {
        // takes daily weather data from API call and returns array of weather data for that day
        // this is for historical daily weather (ie: yesterday and two days ago weather)

        // remember, there is a 24 hour hourly forecast. I am just taking weather at noon of requested day
        const dailyTemps = [];
        const dailyHumidity = [];
        const dailyWind = [];
        const dailyClouds = [];   // this is measured as a percentage (ie: 50% cloudy)

        for (const hourlyWeather of dailyWeatherData['hourly']) {
            // add hourly measurements reading to dailyTemps
            dailyTemps.push(hourlyWeather['temp']);
            dailyHumidity.push(hourlyWeather['humidity']);
            dailyWind.push(hourlyWeather['wind_speed']);
            dailyClouds.push(hourlyWeather['clouds']);
        }
        const hiTemp = Math.max(...dailyTemps).toFixed(2);  //toFixed = round to 2 decimal places
        const loTemp = Math.min(...dailyTemps).toFixed(2);

        // must write function to get avg of array
        const getAverage = (array) => array.reduce((a,b) => a + b) / array.length
        const avgHumidity = getAverage(dailyHumidity).toFixed(2);
        const avgWind = getAverage(dailyWind).toFixed(2);
        const avgClouds = getAverage(dailyClouds).toFixed(2);
        const precip = 'n/a';

        // THIS IS THE STRUCTURE OF THE DATA RETURNED FROM API CALL
        const dailyWeatherStats = {
            "hiTemp":hiTemp, 
            "loTemp":loTemp, 
            "humidity":avgHumidity, 
            "wind":avgWind, 
            "clouds":avgClouds, 
            "precip":precip
        }
        return dailyWeatherStats;
    }


    

    ///////////////////////////////////////
    // get dates for injecting into HTML //
    ///////////////////////////////////////

    let minus2daysDate = new Date();
    minus2daysDate.setDate(minus2daysDate.getDate() -2);
    minus2daysDate = minus2daysDate.toLocaleDateString();

    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    yesterdayDate = yesterdayDate.toLocaleDateString();
    
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    todayDate = todayDate.toLocaleDateString();

    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate = tomorrowDate.toLocaleDateString();

    let plus2daysDate = new Date();
    plus2daysDate.setDate(plus2daysDate.getDate() + 2);
    plus2daysDate = plus2daysDate.toLocaleDateString();

    let plus3daysDate = new Date();
    plus3daysDate.setDate(plus3daysDate.getDate() + 3);
    plus3daysDate = plus3daysDate.toLocaleDateString();

    let plus4daysDate = new Date();
    plus4daysDate.setDate(plus4daysDate.getDate() + 4);
    plus4daysDate = plus4daysDate.toLocaleDateString();

    return (
        <>
            <div id='weatherBox'>
                <h2>Weather</h2>
                <div id='dailyBoxes'>
                    <div id='dailyBox'>
                        <p className="day">-2 Days</p>
                        <p className="date">{minus2daysDate}</p>
                        <p>Hi Temp: {twoDaysAgoWeather && (twoDaysAgoWeather.hiTemp)}F</p>
                        <p>Lo Temp: {twoDaysAgoWeather && (twoDaysAgoWeather.loTemp)}F</p>
                        <p>Precip: {twoDaysAgoWeather && (twoDaysAgoWeather.precip)}</p>
                        <p>Wind: {twoDaysAgoWeather && (twoDaysAgoWeather.wind)}mph</p>
                        <p>Humidity: {twoDaysAgoWeather && (twoDaysAgoWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">Yesterday</p>
                        <p className="date">{yesterdayDate}</p>
                        <p>Hi Temp: {yesterdayWeather && (yesterdayWeather.hiTemp)}F</p>
                        <p>Lo Temp: {yesterdayWeather && (yesterdayWeather.loTemp)}F</p>
                        <p>Precip: {yesterdayWeather && (yesterdayWeather.precip)}</p>
                        <p>Wind: {yesterdayWeather && (yesterdayWeather.wind)}mph</p>
                        <p>Humidity: {yesterdayWeather && (yesterdayWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">Today</p>
                        <p className="date">{todayDate}</p>
                        <p>Hi Temp: {todayWeather && (todayWeather.hiTemp)}F</p>
                        <p>Lo Temp: {todayWeather && (todayWeather.loTemp)}F</p>
                        <p>Precip: {todayWeather && (todayWeather.precip)}in</p>
                        <p>Wind: {todayWeather && (todayWeather.wind)}mph</p>
                        <p>Humidity: {todayWeather && (todayWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">Tomorrow</p>
                        <p className="date">{tomorrowDate}</p>
                        <p>Hi Temp: {tomorrowWeather && (tomorrowWeather.hiTemp)}F</p>
                        <p>Lo Temp: {tomorrowWeather && (tomorrowWeather.loTemp)}F</p>
                        <p>Precip: {tomorrowWeather && (tomorrowWeather.precip)}in</p>
                        <p>Wind: {tomorrowWeather && (tomorrowWeather.wind)}mph</p>
                        <p>Humidity: {tomorrowWeather && (tomorrowWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+2 Days</p>
                        <p className="date">{plus2daysDate}</p>
                        <p>Hi Temp: {inTwoDaysWeather && (inTwoDaysWeather.hiTemp)}F</p>
                        <p>Lo Temp: {inTwoDaysWeather && (inTwoDaysWeather.loTemp)}F</p>
                        <p>Precip: {inTwoDaysWeather && (inTwoDaysWeather.precip)}in</p>
                        <p>Wind: {inTwoDaysWeather && (inTwoDaysWeather.wind)}mph</p>
                        <p>Humidity: {inTwoDaysWeather && (inTwoDaysWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+3 Days</p>
                        <p className="date">{plus3daysDate}</p>
                        <p>Hi Temp: {inThreeDaysWeather && (inThreeDaysWeather.hiTemp)}F</p>
                        <p>Lo Temp: {inThreeDaysWeather && (inThreeDaysWeather.loTemp)}F</p>
                        <p>Precip: {inThreeDaysWeather && (inThreeDaysWeather.precip)}in</p>
                        <p>Wind: {inThreeDaysWeather && (inThreeDaysWeather.wind)}mph</p>
                        <p>Humidity: {inThreeDaysWeather && (inThreeDaysWeather.humidity)}%</p>
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+4 Days</p>
                        <p className="date">{plus4daysDate}</p>
                        <p>Hi Temp: {inFourDaysWeather && (inFourDaysWeather.hiTemp)}F</p>
                        <p>Lo Temp: {inFourDaysWeather && (inFourDaysWeather.loTemp)}F</p>
                        <p>Precip: {inFourDaysWeather && (inFourDaysWeather.precip)}in</p>
                        <p>Wind: {inFourDaysWeather && (inFourDaysWeather.wind)}mph</p>
                        <p>Humidity: {inFourDaysWeather && (inFourDaysWeather.humidity)}%</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default WeatherComponent;
