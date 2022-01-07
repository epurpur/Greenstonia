import React, { useState, useEffect } from "react";

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
    
    const [weatherData, setweatherData] = useState(null);

    // Getting weather info in order to pass as props to Conditions Alert and Weather Component
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=charlottesville&appid=333de4e909a5ffe9bfa46f0f89cad105&units=imperial`)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log('DATA:',data);
                // setweatherData(data);
            })
    }, []);
    






    // make API request for today's weather forecast in requested city
    // fetch(url)
    //     .then(function (response) {
    //         if (response.ok) {             //if user input is a valid city name
    //             return response.json(); 
    //         } else {
    //             alert('bad response');
    //             return Promise.reject(response)
    //         }
    //     })
    //     .then(function (data) {
    //         console.log('Boone data: ', data);
    //     });

    return (
        <>
            <Header />
            <section>
                <AccessAlert />
                <ConditionsAlert />
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