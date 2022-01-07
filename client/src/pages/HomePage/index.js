import React from "react";

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AccessAlert from "../../components/AccessAlert";
import SearchBar from "../../components/SearchBar";
import AreasMap from "../../components/AreasMap";
import RouteList from "../../components/RouteList";
import WeatherComponent from "../../components/WeatherComponent";

/* CSS styles */
import "./styles.css";

const HomePage = () => {
  
    return (
        <>
            <Header />
            <section>
                <AccessAlert />
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