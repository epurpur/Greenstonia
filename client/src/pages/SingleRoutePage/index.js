import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

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

const SingleRoutePage = () => {

    let singleRouteData = useLocation();
    singleRouteData = singleRouteData.state;
    console.log('SINGLE ROUTE DATA!!', singleRouteData);

    console.log('image URLs');
    console.log(singleRouteData.routeImgURL)

    // setting user context of page
    const { pageName, setPageName } = useContext(PageContext)
    setPageName('Route');

    // setting currently editing context of page
    const { currentlyEditing, setCurrentlyEditing } = useContext(CurrentlyEditingContext);
    setCurrentlyEditing(false);

    // setting editor context of page
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    // using useEffect to pass in id and name of boulder for creating new route
    useEffect(() => {
        // testChange()
        setEditorInfo({
            ...editorInfo,
            ['typeID']: singleRouteData.boulderID,
            ['typeName']: singleRouteData.boulderName
        })
    }, []); 


    return (
        <>
            <Header />
                <div id='routeInfoHolder'>
                    <p id="breadcrumb">Go Back: <Link to={{pathname: `/boulder/${singleRouteData.boulderName}`, state: {key: singleRouteData.boulderID, boulderID: singleRouteData.boulderID, boulderName: singleRouteData.boulderName, areaName: singleRouteData.areaName }}}>{singleRouteData.boulderName}</Link></p>
                    <h2> {singleRouteData.routeName} </h2>
                    <div><span>Grade: </span> {singleRouteData.routeGrade} </div>
                    <div><span>Quality: </span> {singleRouteData.routeQuality} stars </div>
                    <div><span>First Ascent: </span>{singleRouteData.firstAscent} </div>
                    <div><span>Description: </span>{singleRouteData.routeDescription} </div>
                    <div style={{"text-decoration":"underline", "font-size":"25px"}}> Route Images </div>
                    { singleRouteData.routeImgURL.length > 0 ?
                        <div id='imageCardsBox'>
                            <ImageCards imageInfo={'placeholder'}/>
                        </div>
                    :
                        // no images for this route
                        <br></br>
                    }

                    <div style={{"text-decoration":"underline", "font-size":"25px"}}> Route Video </div>
                    <div id="singleRouteVideo">
                        {singleRouteData.routeYoutubeEmbedURL ? 
                            <iframe 
                                width="653" 
                                height="400" 
                                src={`https://www.youtube.com/embed/${singleRouteData.routeYoutubeEmbedURL}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={singleRouteData.routeName}>
                            </iframe> 
                        :
                            // no video for this route
                            <br></br>
                        }

                    </div>
                </div>
            <Footer />
        </>
    )
}

export default SingleRoutePage;
