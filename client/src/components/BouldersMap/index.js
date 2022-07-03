import React from 'react'
import { Link } from 'react-router-dom';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/* CSS styles */
import "./styles.css";

const BouldersMap = (props) => {

    let bouldersData = props.bouldersData;
    let areaData = props.areaData

    // console.log('DATA FROM BOULDERSMAP COMPONENT');
    // console.log("Boulders Data", bouldersData);
    // console.log("Area Data", areaData);



    return (
        <>
            {/* Set center of map to location of first boulder in bouldersData */}
            <MapContainer center={[bouldersData[0].latitude, bouldersData[0].longitude]} zoom={14} scrollWheelZoom={false}>
                    {/* Google Maps basemap as TileLayer */}
                    <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                    {bouldersData.map((boulder) => 
                        (
                            //create marker w/ popup for each boulder in this area
                            <Marker position={[parseFloat(boulder.latitude), parseFloat(boulder.longitude)]}>
                                <Popup>
                                    <h2>{boulder.boulderName}</h2>
                                    <Link key={boulder._id} to={{pathname:`/boulder/${boulder.boulderName}`, state: {boulderID: boulder._id, 
                                                                                                                    boulderName: boulder.boulderName, 
                                                                                                                    latitude: boulder.latitude, 
                                                                                                                    longitude: boulder.longitude,
                                                                                                                    areaId: areaData.key,
                                                                                                                    areaName: areaData.areaName }}}> Click to view boulder info </Link>
                                </Popup>
                            </Marker>
                        )
                    )}
            </MapContainer>
        </>
    )
}

export default BouldersMap;
