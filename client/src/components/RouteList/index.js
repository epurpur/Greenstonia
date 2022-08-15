import React from 'react';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

const RouteList = (props) => {
    
    let climbingAreas = props.areas;
    // console.log('climbingAreas from ROUTELIST component')
    // console.log(climbingAreas);

    // sort climbing areas alphabetically by name
    // need to make copy of climbingAreas array to do this
    const arrayForSort = [...climbingAreas];
    const climbingAreasByName = arrayForSort.sort((a, b) => a.areaName < b.areaName ? -1 : (a.areaName > b.areaName ? 1 : 0))

    return (
        <>
            <section id='routeList'>
                <div id='routeListTitle'>Search Areas by Name (RouteList component)</div>
                <div id='areaCards'>
                    {climbingAreasByName.map((area) =>
                    // create card for each climbing area. These are sorted into alphabetical order
                        (
                            // this is a link to Area Page
                            <Link key={area._id} to={{pathname: `/area/${area.areaName}`, state: {key: area._id, areaName: area.areaName }}}>
                                <p key={area._id} className='labelCard'>{area.areaName}</p>
                            </Link>
                        )
                    )}
                </div>
            </section>
        </>
    )
};

export default RouteList;
