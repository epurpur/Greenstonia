import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/* Styles */

/* Context */
import { EditorContext } from '../../utils/EditorContext';
import { PageContext } from '../../utils/PageContext';

const EditorPage = () => {

    // global user context variable of editor info state
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    const { pageName, setPageName } = useContext(PageContext);
    console.log('EDITOR CONTEXT INFO', editorInfo);
    console.log('PAGE CONTEXT', pageName)

    return (
        <>
            <Header />
            <div id='editorFormHolder'>
                {/* FIX BREADCRUMB HERE!!! START HERE */}
                <p id="breadcrumb">Go Back: <Link to='/home'>Home Page</Link></p> 

                <p>Current Info</p>

                {
                /* data needed to create new area: areaName, areaDescription, parkingDescription, approachDescription, latitude, longitude  */
                pageName === 'Area' && <>Create new area</>
                
                }

                {
                /* data needed to create new boulder: boulderName, boulderDescription, areaID, latitude, longitude, boulderImgURL */
                pageName === 'Boulder' && <>create new boulder</>
                
                }

                {
                /* data needed to create new route: routeName, routeDescription, firstAscent, routeGrade, routeQuality, boulderID, routeImgURL, routeYoutubeEmbedURL */
                pageName === 'Route' && <>Create new route</>
                
                }

            </div>

            <Footer />
        </>
    )
}

export default EditorPage;