import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_AREAS } from '../../utils/queries';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AccessAlert from "../../components/AccessAlert";
import ConditionsAlert from "../../components/ConditionsAlert";
import SearchBar from "../../components/SearchBar";
import AreasMap from "../../components/AreasMap";
import RouteList from "../../components/RouteList";
import WeatherComponent from "../../components/WeatherComponent";

/* CSS styles */
import "./styles.css";

const HomePage = () => {
    
    const [todayWeatherData, settodayWeatherData] = useState(null);

    // Make DB call for all Area data
    const { loading, data } = useQuery(QUERY_AREAS);
    // need to wait for data to appear as useQuery is an asynchronous API call
    if (data) {console.log(data.areas)}
    

    // Getting weather info in order to pass as props to Conditions Alert and Weather Component
    // useEffect(() => {
    //     // API call to OpenWeatherMap for today's weather forecast in Charlottesville, VA
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=charlottesville&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=imperial`)
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             //drill down to get today's current temperature
    //             let currentTemp = data['main']['temp'];
    //             //algorithm to decide what the conditions are today. 
    //             //BUILD THIS OUT MORE LATER
    //             if (currentTemp <= 35) {
    //                 settodayWeatherData('cold');
    //             } else if (currentTemp > 35 && currentTemp <= 65) {
    //                 settodayWeatherData('good');
    //             } else if (currentTemp > 65) {
    //                 settodayWeatherData('hot');
    //             } else {
    //                 settodayWeatherData('unavailable')
    //             }

    //         })
    // }, []);
    

    return (
        <>
            <Header />
            <section>
                <AccessAlert />
                <ConditionsAlert todayWeatherData={todayWeatherData} />     {/* Passing weatherData from API call as props to this component */}
                <SearchBar />
                <AreasMap />
                <RouteList />
                <WeatherComponent />
            </section>
            <Footer />
        </>
    );
  };
  
  export default HomePage;