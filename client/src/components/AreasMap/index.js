import React from 'react';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

const AreasMap = (props) => {

    // pass in props from home page
    const areas = props.areas

    return (
        <>
            <div id='mapTitleText'>Search Areas by Map</div>
            {areas.length > 0 ?
            // if there are areas in the database, show map with markers of areas
            <MapContainer center={[37.95, -78.98]} zoom={11.25} scrollWheelZoom={false}>
                {/* Google Maps basemap as TileLayer */}
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                  {areas && areas.map((area) => 
                    (
                        // create marker w/ popup for each area in map
                        <Marker position={[parseFloat(area.latitude), parseFloat(area.longitude)]}>
                            <Popup>
                                <h2>{area.areaName}</h2>
                                <Link key={area._id} to={{pathname: `/area/${area.areaName}`, state: {key: area._id, areaName: area.areaName  }}}> Click to view area info </Link>
                            </Popup>
                        </Marker>
                    )
                  )}
            </MapContainer>
            :
            // if there are no areas in the database, just show map with no markers
            <MapContainer center={[37.95, -78.98]} zoom={11.25} scrollWheelZoom={false}>
            {/* Google Maps basemap as TileLayer */}
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
            </MapContainer>
            }
        </>
    )
};

export default AreasMap;
