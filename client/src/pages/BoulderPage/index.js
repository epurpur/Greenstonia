import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_ROUTESBYBOULDER } from '../../utils/queries';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImageCards from '../../components/ImageCards';

/* CSS styles */
import "./styles.css";

/* Context */
import { PageContext } from "../../utils/PageContext";
import { EditorContext } from '../../utils/EditorContext';
import { CurrentlyEditingContext } from '../../utils/CurrentlyEditing';

const BoulderPage = () => {

    // setting user context of page
    const { pageName, setPageName } = useContext(PageContext)
    setPageName('Boulder');

    // data passed in as state from AreasPage component
    // this is used for the current boulder's name and id number which is accessed by bouldersData.state
    let bouldersData = useLocation();
    bouldersData = bouldersData.state;
    console.log('BOULDER DATA BEFORE API CALL', bouldersData);

    // setting currently editing context of page
    const { currentlyEditing, setCurrentlyEditing } = useContext(CurrentlyEditingContext);
    setCurrentlyEditing(false);

    // setting context of editor info
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    // using useEffect to pass in id and name of area for creating new boulder
    useEffect(() => {
        // testChange()
        setEditorInfo({
            ...editorInfo,
            ['typeID']: bouldersData.areaId,
            ['typeName']: bouldersData.areaName
        })
    }, []);    


    // make API call to database for routes for this particular boulder, using ID of current boulder
    const { loading, data } = useQuery(QUERY_ROUTESBYBOULDER, {variables: {boulderID: bouldersData.boulderID}});
    const routesByBoulder = data?.routesByBoulder || [];
    //console.log('boulder data', routesByBoulder)
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
                    <p id="breadcrumb">Go Back: <Link to={{pathname:`/area/${bouldersData.areaName}`, state: {key: bouldersData.areaId, areaName: bouldersData.areaName}}}>{bouldersData.areaName}</Link></p>
                    <h2> {routesByBoulder && routesByBoulder.boulderName} </h2>
                    <p> {routesByBoulder && routesByBoulder.boulderDescription} </p>
                    <div>Search Routes by Name</div>
                        <div id='routeCardHolder'>
                            {routesSorted && routesSorted.map((route) =>
                            // create card for each route in the area
                                (
                                    <Link key={route._id} to={{pathname:`/singleRoute/${route.routeName}`, state: {key: route._id, 
                                                                                                                        routeID: route._id, 
                                                                                                                        firstAscent: route.firstAscent, 
                                                                                                                        routeDescription: route.routeDescription, 
                                                                                                                        routeGrade: route.routeGrade, 
                                                                                                                        routeName: route.routeName, 
                                                                                                                        routeQuality: route.routeQuality,
                                                                                                                        routeImgURL: route.routeImgURL,
                                                                                                                        routeYoutubeEmbedURL: route.routeYoutubeEmbedURL,
                                                                                                                        boulderID: bouldersData.boulderID,
                                                                                                                        boulderName: bouldersData.boulderName,
                                                                                                                        areaName: bouldersData.areaName}}}>
                                        <p key={route._id} className='labelCard'>{route.routeName}</p>
                                    </Link>
                                )
                            )}
                        </div>
                </div>
                <div id="imageCardsHolder">
                    <ImageCards imageInfo={'placeholder'}/>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default BoulderPage;
