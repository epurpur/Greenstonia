import React from "react";

/* Components */
import Header from "../../components/Header";

/* CSS styles */
import "./styles.css";

const HomePage = () => {
  
    return (
        <>
            <Header />
            <section>
                {/* These items will all become individual components */}
                {/* Don't forget to change CSS for them too */}
                <div id='alerts'>Alerts</div>
                <div id='search'>Search </div>
                <div id='routeFinders'>
                    <div id='map'>Search by map</div>
                    <div id='routeList'>Search by name</div>
                </div>
                <div id='weather'>Weather</div>
            </section>
        </>
    );
  };
  
  export default HomePage;