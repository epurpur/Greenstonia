import React, { useState, useEffect } from 'react';

/* Weather Images */
import nodata from '../../images/weather_images/nodata.png';
import cold from '../../images/weather_images/cold.png';
import hot from '../../images/weather_images/hot.png';
import partlycloudy from '../../images/weather_images/partlycloudy.png';
import clouds from '../../images/weather_images/clouds.png';
import rain from '../../images/weather_images/rain.png';
import sun from '../../images/weather_images/sun.png';
import wind from '../../images/weather_images/wind.png';
import extreme from '../../images/weather_images/extreme.png';

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

    // state for weather images. set to nodata by default
    const [twoDaysAgoWeatherImg, settwoDaysAgoWeatherImg] = useState(nodata);
    const [yesterdayWeatherImg, setyesterdayWeatherImg] = useState(nodata);
    const [todayWeatherImg, settodayWeatherImg] = useState(nodata);
    const [tomorrowWeatherImg, settomorrowWeatherImg] = useState(nodata);
    const [inTwoDaysWeatherImg, setinTwoDaysWeatherImg] = useState(nodata);
    const [inThreeDaysWeatherImg, setinThreeDaysWeatherImg] = useState(nodata);
    const [inFourDaysWeatherImg, setinFourDaysWeatherImg] = useState(nodata);
    

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

                    //set state of twoDaysAgoWeather image
                    if (weatherData.image === 'Clouds') {
                        settwoDaysAgoWeatherImg(clouds);
                    } else if (weatherData.image === 'Snow') {
                        settwoDaysAgoWeatherImg(cold);
                    } else if (weatherData.image === 'Mist' || weatherData.image === 'Rain' || weatherData.image === 'Drizzle') {
                        settwoDaysAgoWeatherImg(rain);
                    } else if (weatherData.image === 'Clear') {
                        settwoDaysAgoWeatherImg(sun);
                    } else if (weatherData.image === 'Extreme') {
                        settwoDaysAgoWeatherImg(extreme)
                    }

                } else if (timestamp === yesterdayTimestamp) {
                    // set state of yesterdayWeather to the dailyWeatherStats object returned from parseHistoricalDailyWeather
                    setyesterdayWeather(weatherData);

                    //set state of yesterdayWeather image
                    if (weatherData.image === 'Clouds') {
                        setyesterdayWeatherImg(clouds);
                    } else if (weatherData.image === 'Snow') {
                        setyesterdayWeatherImg(cold);
                    } else if (weatherData.image === 'Mist' || weatherData.image === 'Rain' || weatherData.image === 'Drizzle') {
                        setyesterdayWeatherImg(rain);
                    } else if (weatherData.image === 'Clear') {
                        setyesterdayWeatherImg(sun);
                    } else if (weatherData.image === 'Extreme') {
                        setyesterdayWeatherImg(extreme)
                    }
                }
                
            } catch (err) {
                //if error, manually set weather data to 'n/a'
                let weatherData = {
                    "hiTemp":'n/a', 
                    "loTemp":'n/a', 
                    "humidity":'n/a', 
                    "wind":'n/a', 
                    "clouds":'n/a', 
                    "precip":'n/a',
                    "image":'nodata'
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

        fetchHistoricalWeatherData(twoDaysAgoTimestamp);  //get weather two days ago
        fetchHistoricalWeatherData(yesterdayTimestamp);   //get weather yesterday



        //Get future weather forecast data
        async function getWeatherForecast() {

            try {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=37.8849&lon=-78.8995&exclude=hourly,minutely&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
                let data = await response.json();
                // get just 'daily' key and just first 5 items from array (includes 7 day forecast but I only want 5 days)
                data = data['daily'].slice(0,-3);
                
                // make accumulator array to capture each day's daily weather object
                const dailyWeatherData = []
                
                // for each day in 5 day weather forecast
                for (let i of data) {
    
                    //need to format precipitation data
                    let dailyPrecip = i['rain'] + i['snow'];

                    // need to use weird isNaN function to check if daily precip is null
                    if (isNaN(dailyPrecip)) {
                        dailyPrecip = "0.00"
                    } else {
                        //convert mm to in
                        dailyPrecip = dailyPrecip * .0393701
                        //round to 2 decimal places
                        dailyPrecip = dailyPrecip.toFixed(2)
                    }
    
                    // create image object out of 'overall' description for the day
                    // THIS WILL LATER BECOME A MORE INVOLVED ALGORITHM FOR THE WEATHER
                    let overallWeather = i['weather'][0]['main']
                    //clouds, snow, mist, rain, clear, drizzle, extreme
                    

                    // create weather object for each day
                    const oneDayWeather = {
                        "hiTemp": i['temp']['max'],
                        "loTemp": i['temp']['min'],
                        "humidity": i['humidity'],
                        "wind": i['wind_speed'],
                        "clouds": i['clouds'],
                        "precip": dailyPrecip,  //round to 2 decimal places. convert mm to in
                        "image": overallWeather
                    }
                    
                    // push weather object to dailyWeatherData array
                    dailyWeatherData.push(oneDayWeather);
                }
                    // set state for corresponding day and weather image with each object in dailyWeatherData array
                    settodayWeather(dailyWeatherData[0]);  //today
                    //set state of todayWeather image
                    if (dailyWeatherData[0].image === 'Clouds') {
                        settodayWeatherImg(clouds);
                    } else if (dailyWeatherData[0].image === 'Snow') {
                        settodayWeatherImg(cold);
                    } else if (dailyWeatherData[0].image === 'Mist' || dailyWeatherData[0].image === 'Rain' || dailyWeatherData[0].image === 'Drizzle') {
                        settodayWeatherImg(rain);
                    } else if (dailyWeatherData[0].image === 'Clear') {
                        settodayWeatherImg(sun);
                    } else if (dailyWeatherData[0].image === 'Extreme') {
                        settodayWeatherImg(extreme)
                    }
                    
                    settomorrowWeather(dailyWeatherData[1]);  // tomorrow
                    //set state of tomorrowWeather image
                    if (dailyWeatherData[1].image === 'Clouds') {
                        settomorrowWeatherImg(clouds);
                    } else if (dailyWeatherData[1].image === 'Snow') {
                        settomorrowWeatherImg(cold);
                    } else if (dailyWeatherData[1].image === 'Mist' || dailyWeatherData[1].image === 'Rain' || dailyWeatherData[1].image === 'Drizzle') {
                        settomorrowWeatherImg(rain);
                    } else if (dailyWeatherData[1].image === 'Clear') {
                        settomorrowWeatherImg(sun);
                    } else if (dailyWeatherData[1].image === 'Extreme') {
                        settomorrowWeatherImg(extreme)
                    }

                    setinTwoDaysWeather(dailyWeatherData[2]);  // in two days
                    //set state of inTwoDaysWeather image
                    if (dailyWeatherData[2].image === 'Clouds') {
                        setinTwoDaysWeatherImg(clouds);
                    } else if (dailyWeatherData[2].image === 'Snow') {
                        setinTwoDaysWeatherImg(cold);
                    } else if (dailyWeatherData[2].image === 'Mist' || dailyWeatherData[2].image === 'Rain' || dailyWeatherData[2].image === 'Drizzle') {
                        setinTwoDaysWeatherImg(rain);
                    } else if (dailyWeatherData[2].image === 'Clear') {
                        setinTwoDaysWeatherImg(sun);
                    } else if (dailyWeatherData[2].image === 'Extreme') {
                        setinTwoDaysWeatherImg(extreme)
                    }

                    setinThreeDaysWeather(dailyWeatherData[3]); // in three days
                    //set state of inThreeDaysWeather image
                    if (dailyWeatherData[3].image === 'Clouds') {
                        setinThreeDaysWeatherImg(clouds);
                    } else if (dailyWeatherData[3].image === 'Snow') {
                        setinThreeDaysWeatherImg(cold);
                    } else if (dailyWeatherData[3].image === 'Mist' || dailyWeatherData[3].image === 'Rain' || dailyWeatherData[3].image === 'Drizzle') {
                        setinThreeDaysWeatherImg(rain);
                    } else if (dailyWeatherData[3].image === 'Clear') {
                        setinThreeDaysWeatherImg(sun);
                    } else if (dailyWeatherData[3].image === 'Extreme') {
                        setinThreeDaysWeatherImg(extreme)
                    }

                    setinFourDaysWeather(dailyWeatherData[4]);  // in four days
                    //set state of inFourDaysWeather image
                    if (dailyWeatherData[4].image === 'Clouds') {
                        setinFourDaysWeatherImg(clouds);
                    } else if (dailyWeatherData[4].image === 'Snow') {
                        setinFourDaysWeatherImg(cold);
                    } else if (dailyWeatherData[4].image === 'Mist' || dailyWeatherData[4].image === 'Rain' || dailyWeatherData[4].image === 'Drizzle') {
                        setinFourDaysWeatherImg(rain);
                    } else if (dailyWeatherData[4].image === 'Clear') {
                        setinFourDaysWeatherImg(sun);
                    } else if (dailyWeatherData[4].image === 'Extreme') {
                        setinFourDaysWeatherImg(extreme)
                    }

            } catch (err) {

                // make accumulator array to capture each day's daily weather object
                const dailyWeatherData = []

                // run loop 5 times (5 days in weather forecast)
                for (let i = 0; i<5; i++) {

                    // create weather object for each day
                    const oneDayWeather = {
                        "hiTemp": 'n/a',
                        "loTemp": 'n/a',
                        "humidity": 'n/a',
                        "wind": 'n/a',
                        "clouds": 'n/a',
                        "precip": 'n/a',  
                        "image": 'nodata'
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
        }


        getWeatherForecast();  // get 5 day weather forecast

    }, []);


    // Helper function to parse long historical daily weather strings
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

        // logic to handle 'image', which will be translated to the image shown for each daily forecast


        // THIS IS THE STRUCTURE OF THE DATA RETURNED BY THIS FUNCTION
        const dailyWeatherStats = {
            "hiTemp":hiTemp, 
            "loTemp":loTemp, 
            "humidity":avgHumidity, 
            "wind":avgWind, 
            "clouds":avgClouds, 
            "precip":precip,
            "image":dailyWeatherData['hourly'][11]['weather'][0]['main']  //getting weather description at 12 noon that day
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
                        <img className="weatherImg" src={twoDaysAgoWeatherImg && (twoDaysAgoWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.precip)} in</p>
                        <p><b>Wind:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {twoDaysAgoWeather && (twoDaysAgoWeather.image)}</p> */}
                    </div>
                    <div id='dailyBox'>
                        <p className="day">Yesterday</p>
                        <p className="date">{yesterdayDate}</p>
                        <img className="weatherImg" src={yesterdayWeatherImg && (yesterdayWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {yesterdayWeather && (yesterdayWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {yesterdayWeather && (yesterdayWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {yesterdayWeather && (yesterdayWeather.precip)} in</p>
                        <p><b>Wind:</b> {yesterdayWeather && (yesterdayWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {yesterdayWeather && (yesterdayWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {yesterdayWeather && (yesterdayWeather.image)}</p> */}
                    </div>
                    <div id='dailyBox'>
                        <p className="day">Today</p>
                        <p className="date">{todayDate}</p>
                        <img className="weatherImg" src={todayWeatherImg && (todayWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {todayWeather && (todayWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {todayWeather && (todayWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {todayWeather && (todayWeather.precip)} in</p>
                        <p><b>Wind:</b> {todayWeather && (todayWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {todayWeather && (todayWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {todayWeather && (todayWeather.image)} </p> */}

                    </div>
                    <div id='dailyBox'>
                        <p className="day">Tomorrow</p>
                        <p className="date">{tomorrowDate}</p>
                        <img className="weatherImg" src={tomorrowWeatherImg && (tomorrowWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {tomorrowWeather && (tomorrowWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {tomorrowWeather && (tomorrowWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {tomorrowWeather && (tomorrowWeather.precip)} in</p>
                        <p><b>Wind:</b> {tomorrowWeather && (tomorrowWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {tomorrowWeather && (tomorrowWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {tomorrowWeather && (tomorrowWeather.image)} </p> */}
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+2 Days</p>
                        <p className="date">{plus2daysDate}</p>
                        <img className="weatherImg" src={inTwoDaysWeatherImg && (inTwoDaysWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {inTwoDaysWeather && (inTwoDaysWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {inTwoDaysWeather && (inTwoDaysWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {inTwoDaysWeather && (inTwoDaysWeather.precip)} in</p>
                        <p><b>Wind:</b> {inTwoDaysWeather && (inTwoDaysWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {inTwoDaysWeather && (inTwoDaysWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {inTwoDaysWeather && (inTwoDaysWeather.image)} </p> */}
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+3 Days</p>
                        <p className="date">{plus3daysDate}</p>
                        <img className="weatherImg" src={inThreeDaysWeatherImg && (inThreeDaysWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {inThreeDaysWeather && (inThreeDaysWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {inThreeDaysWeather && (inThreeDaysWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {inThreeDaysWeather && (inThreeDaysWeather.precip)} in</p>
                        <p><b>Wind:</b> {inThreeDaysWeather && (inThreeDaysWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {inThreeDaysWeather && (inThreeDaysWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {inThreeDaysWeather && (inThreeDaysWeather.image)} </p> */}
                    </div>
                    <div id='dailyBox'>
                        <p className="day">+4 Days</p>
                        <p className="date">{plus4daysDate}</p>
                        <img className="weatherImg" src={inFourDaysWeatherImg && (inFourDaysWeatherImg)}></img>
                        <p><b>Hi Temp:</b> {inFourDaysWeather && (inFourDaysWeather.hiTemp)} F</p>
                        <p><b>Lo Temp:</b> {inFourDaysWeather && (inFourDaysWeather.loTemp)} F</p>
                        <p><b>Precip:</b> {inFourDaysWeather && (inFourDaysWeather.precip)} in</p>
                        <p><b>Wind:</b> {inFourDaysWeather && (inFourDaysWeather.wind)} mph</p>
                        <p><b>Humidity:</b> {inFourDaysWeather && (inFourDaysWeather.humidity)} %</p>
                        {/* <p><b>image:</b> {inFourDaysWeather && (inFourDaysWeather.image)} </p> */}
                    </div>
                </div>
            </div>
        </>
    )
};

export default WeatherComponent;
