import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_AREAS } from '../../utils/queries';

/* CSS styles */
import "./styles.css";

const RouteList = () => {

    return (
        <>
            <section id='routeList'>
                <div id='routeListTitle'>Search Areas by Name (RouteList component)</div>
                <div id='areaCards'>
                    {/* This will be replaced with an API call for all areas */}
                    <p>Rock Point Overlook</p>
                    <p>The Forest</p>
                    <p>Drive By (Mile 5)</p>
                    <p>12.2</p>
                    <p>Snail Boulder</p>
                </div>
            </section>
            

        </>
    )
};

export default RouteList;
