import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_ROUTESBYBOULDER } from '../../utils/queries';

/* Components */
import Header from "../../components/Header";
import BouldersMap from "../../components/BouldersMap";
import BouldersList from '../../components/BouldersList';
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

const BoulderPage = () => {

    // data passed in as state from AreasPage component
    // this is used for the current boulder's name and id number which is accessed by boulderData.state
    let boulderData = useLocation();
    boulderData = boulderData.state;

    // make API call to database for routes for this particular boulder, using ID of current boulder
    const { loading, data } = useQuery(QUERY_ROUTESBYBOULDER, {variables: {boulderID: boulderData.boulderID}});
    const routesByBoulder = data?.routesByBoulder || [];
    console.log('RTS BY BOULDER', routesByBoulder);
    // separate out just the routes
    const routes = routesByBoulder && routesByBoulder.routes;
    
    // need to wait for API call for routes array to exist
    // sort routes alphabetically by name
    // need to make copy of routesByBoulder array to do this
    const arrayForSort = routes && [...routes]
    const routesSorted = arrayForSort && arrayForSort.sort((a, b) => a.routeName < b.routeName ? -1 : (a.routeName > b.routeName ? 1 : 0))

    return (
        <>            
            <Header />
            <div id="boulderInfoHolder">
                <div id='boulderInfo'>
                    <h2> {routesByBoulder && routesByBoulder.boulderName} </h2>
                    <p> {routesByBoulder && routesByBoulder.boulderDescription} </p>
                    <div>Search Routes by Name</div>
                        <div id='routeCardHolder'>
                            {routesSorted && routesSorted.map((route) =>
                            // create card for each route in the area
                                (
                                    // START HERE: this will be a link to a single route page
                                    <p key={route._id} className='routeCard'>{route.routeName}</p>
                                )
                            )}
                        </div>
                </div>
                <BouldersMap />
            </div>
            <Footer />
        </>
    )
}

export default BoulderPage;
