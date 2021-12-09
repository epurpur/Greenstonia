import React from "react";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Alerts from "../../components/Alerts";
import SearchBar from "../../components/SearchBar";
import MapComponent from "../../components/MapComponent";
import RouteList from "../../components/RouteList";
import WeatherComponent from "../../components/WeatherComponent";

/* CSS styles */
import "./styles.css";

const HomePage = () => {
  
    return (
        <>
            <Header />
            <section>
                <Alerts />
                <SearchBar />
                <MapComponent />
                <RouteList />
                <WeatherComponent />
            </section>
            <Footer />
        </>
    );
  };
  
  export default HomePage;