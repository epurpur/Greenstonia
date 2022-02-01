import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_AREAS } from '../../utils/queries';

/* CSS styles */
import "./styles.css";

const RouteList = (props) => {
    
    let climbingAreas = props.areas
    console.log(climbingAreas)
    // sort climbing areas alphabetically by name
    // need to make copy of climbingAreas array to do this
    const arrayForSort = [...climbingAreas]
    const climbingAreasByName = arrayForSort.sort((a, b) => a.areaName < b.areaName ? -1 : (a.areaName > b.areaName ? 1 : 0))

    return (
        <>
            <section id='routeList'>
                <div id='routeListTitle'>Search Areas by Name (RouteList component)</div>
                <div id='areaCards'>
                    {climbingAreasByName.map((area) =>
                    // create card for each climbing area. These are sorted into alphabetical order
                        (
                            <p className='areaCard'>{area.areaName}</p>
                        )
                    )}
                </div>
            </section>
        </>
    )
};

export default RouteList;
