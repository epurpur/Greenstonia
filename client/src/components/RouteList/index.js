import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_AREAS } from '../../utils/queries';

/* CSS styles */
import "./styles.css";

const RouteList = (props) => {
    
    let climbingAreas = props.areas
    // sort climbing areas alphabetically by name
    // need to make copy of climbingAreas array to do this
    const arrayForSort = [...climbingAreas]
    const climbingAreasByName = arrayForSort.sort((a, b) => a.areaName < b.areaName ? -1 : (a.areaName > b.areaName ? 1 : 0))
    console.log(climbingAreasByName)
    return (
        <>
            <section id='routeList'>
                <div id='routeListTitle'>Search Areas by Name (RouteList component)</div>
                <div id='areaCards'>
                    {climbingAreasByName.map((area) =>
                    // create card for each climbing area. These are sorted into alphabetical order
                        (
                            // START HERE
                            // this should be a link to Area Page
                            <Link to={{pathname: `/area/${area.areaName}`,
                                        state: {key: area._id,
                                                areaName: area.areaName ,
                                                areaDescription: area.areaDescription,
                                                parkingDescription: area.parkingDescription }}}>
                                <p className='areaCard'>{area.areaName}</p>
                            </Link>
                        )
                    )}
                </div>
            </section>
        </>
    )
};

export default RouteList;
