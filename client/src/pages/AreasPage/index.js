import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_BOULDERSBYAREA } from '../../utils/queries';

/* Components */
import { MapContainer, TileLayer } from 'react-leaflet';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BouldersMap from '../../components/BouldersMap';

/* CSS styles */
import "./styles.css";

/* Context */
import { PageContext } from "../../utils/PageContext";
import { EditorContext } from "../../utils/EditorContext";
import { CurrentlyEditingContext } from '../../utils/CurrentlyEditing';

const AreasPage = () => {
    
    // data passed in as state from RouteList component
    // this is used for the current area's name which is accesses by areaData.areaName
    let areaData = useLocation();
    areaData = areaData.state;
    console.log('AREA DATA', areaData);

    // setting user context of page
    const { pageName, setPageName } = useContext(PageContext);
    setPageName('Area');

    // setting currently editing context of page
    const { currentlyEditing, setCurrentlyEditing } = useContext(CurrentlyEditingContext);
    setCurrentlyEditing(false);

    // setting context of editor info
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    // using useEffect to pass in placeholder id and name of area for creating new route
    useEffect(() => {
        // testChange()
        setEditorInfo({
            ...editorInfo,
            ['typeID']: 'placeholder',
            ['typeName']: areaData.areaName
        })
    }, []); 

    // making API call to database for boulders by area query, using area name of current area
    const { loading, data } = useQuery(QUERY_BOULDERSBYAREA, {variables: {areaName: areaData.areaName}});
    const bouldersByArea = data?.bouldersByArea || [];

    // separate out just the boulders
    const boulders = bouldersByArea && bouldersByArea.boulders;
    
    // need to wait for API call for boulders array to exist
    // sort climbing areas alphabetically by name
    // need to make copy of bouldersByArea array to do this
    const arrayForSort = boulders && [...boulders]
    const bouldersSorted = arrayForSort && arrayForSort.sort((a, b) => a.boulderName < b.boulderName ? -1 : (a.boulderName > b.boulderName ? 1 : 0))
    //console.log('boulders sorted: ', bouldersSorted)


    return( 
        <> 
            <Header />
            <div id="areaHolder">
                <div id="areaInfo">
                    <p id="breadcrumb">Go Back: <Link to='/home'>Home Page</Link></p>
                    <p><b>Area Name:</b> {bouldersByArea && bouldersByArea.areaName} </p>
                    <p><b>Area Description:</b> {bouldersByArea && bouldersByArea.areaDescription} </p>
                    <p><b>Parking Description:</b> {bouldersByArea && bouldersByArea.parkingDescription} </p>
                    <div>Search Boulders by Name</div>
                    {/* If there is at least one boulder in the area, then display a card for each boulder. */}
                    { bouldersSorted && bouldersSorted.length > 0 ?
                        <div id="boulderCardHolder">
                            {bouldersSorted && bouldersSorted.map((boulder) =>
                            //create card for each boulder in the area
                                (
                                    // this is a link to the Boulder Page 
                                    <Link key={boulder._id} to={{pathname:`/boulder/${boulder.boulderName}`, state: {key: boulder._id, 
                                                                                                                    boulderID: boulder._id, 
                                                                                                                    boulderName: boulder.boulderName, 
                                                                                                                    latitude: boulder.latitude, 
                                                                                                                    longitude: boulder.longitude, 
                                                                                                                    areaId: areaData.key, 
                                                                                                                    areaName: areaData.areaName }}}>
                                        <p key={boulder._id} className='labelCard'>{boulder.boulderName}</p>
                                    </Link>
                                )
                            )}
                        </div>
                    :
                        <div id="boulderCardHolder"><b> No boulders yet in this area! </b></div>
                    }
                </div>
                <div id="boulderMap">
                    <p id="boulderMapTitle">Search boulders by map</p>
                    <div>
                        {/* Need to wait for bouldersSorted to exist before rendering boulders map */}
                        {/* Or if no boulders exist, need to catch this and render empty map instead */}
                        {bouldersSorted && bouldersSorted.length > 0 ?
                            <BouldersMap bouldersData={bouldersSorted} areaData={areaData}/>
                            :
                            // Render empty map if no boulders in area
                            <MapContainer center={[37.95, -78.98]} zoom={11.25} scrollWheelZoom={false}>
                            {/* Google Maps basemap as TileLayer */}
                                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                            </MapContainer>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </> 
    );
};

export default AreasPage;
