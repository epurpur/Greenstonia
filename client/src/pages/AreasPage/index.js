import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_BOULDERSBYAREA } from '../../utils/queries';

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BouldersMap from '../../components/BouldersMap';

/* CSS styles */
import "./styles.css";

const AreasPage = () => {
    
    // data passed in as state from RouteList component
    // this is used for the current area's name which is accesses by areaData.areaName
    let areaData = useLocation();
    areaData = areaData.state;

    
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

    return( 
        <> 
            <Header />
            <div id="areaHolder">
                <div id="areaInfo">
                    <p id="breadcrumb">Go Back: <Link to='/home'>Home Page</Link></p>
                    <p>Area Name: {bouldersByArea && bouldersByArea.areaName} </p>
                    <p>Area Description: {bouldersByArea && bouldersByArea.areaDescription} </p>
                    <p>Parking Description: {bouldersByArea && bouldersByArea.parkingDescription} </p>
                    <div>Search Boulders by Name</div>
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
                                        <p key={boulder._id} className='boulderCard'>{boulder.boulderName}</p>
                                    </Link>
                                )
                            )}
                        </div>
                </div>
                <div id="boulderMap">
                    <p id="boulderMapTitle">Search boulders by map</p>
                    <div>
                        {/* Need to wait for bouldersSorted to exist before rendering boulders map */}
                        {bouldersSorted &&
                            <BouldersMap bouldersData={bouldersSorted}/>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </> 
    );
};

export default AreasPage;
