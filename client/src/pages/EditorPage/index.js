import React, { useState, useContext, useLocation } from 'react';
//import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Button } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

/* Mutations */
import { ADD_AREA, ADD_BOULDER, ADD_ROUTE } from '../../utils/mutations';

/* Queries */
import { QUERY_AREAS, QUERY_BOULDERSBYAREA ,QUERY_ROUTESBYBOULDER } from '../../utils/queries';

/* Context */
import { EditorContext } from '../../utils/EditorContext';
import { PageContext } from '../../utils/PageContext';
import { CurrentlyEditingContext } from '../../utils/CurrentlyEditing';

const EditorPage = () => {


    //invoke usemutation hook to allow adding new area, new boulder, new route
    const [addArea, {areaError, areaData}] = useMutation(ADD_AREA, {
        // refetch areas data upon mutation. This is because useMutation modifies data on the server side.
        // need to refetch data in order to get modified version on client side
        refetchQueries: [{query: QUERY_AREAS}]
    });
    const [addBoulder, { boulderError, boulderData }] = useMutation(ADD_BOULDER, {
        refetchQueries: [{query: QUERY_AREAS}, {query: QUERY_BOULDERSBYAREA}]
    });
    const [addRoute, { routeError, routeData }] = useMutation(ADD_ROUTE, {
        refetchQueries: [{query: QUERY_AREAS}, {query: QUERY_BOULDERSBYAREA}, {query: QUERY_ROUTESBYBOULDER}]
    });

    // global user context variable of editor info state
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    const { pageName, setPageName } = useContext(PageContext);
    const { currentlyEditing, setCurrentlyEditing } = useContext(CurrentlyEditingContext);
    // console.log('EDITOR CONTEXT INFO', editorInfo);
    // console.log('PAGE CONTEXT', pageName)

    // set state of currently editing to true. This hides the 'add' and 'delete' buttons in the header
    setCurrentlyEditing(true);

    // controls state of information entered into area form
    const [areaFormState, setAreaFormState] = useState({
        areaName: '',
        areaDescription: '',
        parkingDescription: '',
        approachDescription: '',
        latitude: '',
        longitude: ''
    });

    const handleAreaFormChange = (event) => {
        // handles changing form values of new area form
        const {name, value} = event.target;
        setAreaFormState({
            ...areaFormState,
            [name]: value
        })

        //console.log('AREA FORM STATE', areaFormState)
    }

    const handleAreaFormSubmit = async (event) => {
        // submits areaFormState to make new record in database
        console.log('use info upon submission: ', areaFormState);

        // create new record in DB
        try {
            const { data } = await addArea({
                variables: {...areaFormState}
            })
        } catch (error) {
            console.log('Error! ', error);
        }

    }

    // controls state of information entered into boulder form
    const [boulderFormState, setBoulderFormState] = useState({
        boulderName: '',
        boulderDescription: '',
        latitude: '',
        longitude: '',
        boulderImgURL: '',
        areaID: editorInfo.typeID,
        areaName: editorInfo.typeName
    });

    const handleBoulderFormChange = (event) => {
        // handles changing form values of new boulder form
        const {name, value} = event.target;
        setBoulderFormState({
            ...boulderFormState,
            [name]: value
        })

        //console.log('BOULDER FORM STATE', boulderFormState)
    };

    const handleBoulderFormSubmit = async (event) => {
        //submits boulderFormState to make new record in database

        // need areaID in order to create new boulder
        console.log('boulder info upon submission', boulderFormState);

        // create new record in DB
        try {
            const { data } = await addBoulder({
                variables: {...boulderFormState}
            })
        } catch (error) {
            console.log('Error!', error)
        }
    }

    // controls state of information entered into route form
    const [routeFormState, setRouteFormState] = useState({
        routeName: '',
        routeDescription: '',
        firstAscent: '',
        routeGrade: '',
        routeQuality: '',
        routeImgURL: '',
        routeYoutubeEmbedURL: '',
        boulderID: editorInfo.typeID,
        boulderName: editorInfo.typeName
    });

    const handleRouteFormChange = (event) => {
        //handles changing form values of new route form
        const {name, value} = event.target;
        setRouteFormState({
            ...routeFormState,
            [name]: value
        })

        //console.log('ROUTE FORM STATE', routeFormState)
    };

    const handleRouteFormSubmit = async (event) => {
        //submits routeFormState to make new record in database
        // need to convert routeQuality to integer
        routeFormState.routeQuality = parseInt(routeFormState.routeQuality)
        console.log('route info upon submission', routeFormState);

        // create new record in db
        try{
            const { data } = await addRoute({
                variables: {...routeFormState}
            })
        } catch (error) {
            console.log('Error!', error)
        }
    }



    return (
        <>
            <Header />
                {pageName === 'Area' &&
                /* data needed to create new area: areaName, areaDescription, parkingDescription, approachDescription, latitude, longitude  */
                 <>
                    <div id='editorFormHolder'>
                        <h4>Create New Area</h4>
                        <Form id="editorForm">
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Area Name</Form.Label>
                                <Form.Control 
                                    name="areaName"
                                    value={areaFormState.areaName || ''}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Area Description</Form.Label>
                                <Form.Control 
                                    name="areaDescription"
                                    value={areaFormState.areaDescription || ''}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Parking Description</Form.Label>
                                <Form.Control 
                                    name="parkingDescription"
                                    value={areaFormState.parkingDescription || ''}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Approach Description</Form.Label>
                                <Form.Control 
                                    name="approachDescription"
                                    value={areaFormState.approachDescription || ''}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Latitude</Form.Label>
                                <Form.Control 
                                    name="latitude"
                                    value={areaFormState.latitude}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Longitude</Form.Label>
                                <Form.Control 
                                    name="longitude"
                                    value={areaFormState.longitude}
                                    onChange={handleAreaFormChange}
                                    required
                                />
                            </Form.Group>
                            <Button id="btnFormSubmit" variant="primary" type="submit" onClick={handleAreaFormSubmit}>
                                <Link to="/home" id="editorSubmitBtn">Submit</Link>
                            </Button>

                        </Form>
                    </div>
                    <br></br>
                 </>
                }

                {
                /* data needed to create new boulder: boulderName, boulderDescription, areaID, latitude, longitude, boulderImgURL */
                pageName === 'Boulder' && 
                <>
                    <div id='editorFormHolder'>
                        <h4>Create new boulder in area: {editorInfo.typeName}</h4>
                        <Form id="editorForm">
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Boulder Name</Form.Label>
                                <Form.Control 
                                    name="boulderName"
                                    value={boulderFormState.boulderName || ''}
                                    onChange={handleBoulderFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Boulder Description</Form.Label>
                                <Form.Control 
                                    name="boulderDescription"
                                    value={boulderFormState.boulderDescription || ''}
                                    onChange={handleBoulderFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Latitude</Form.Label>
                                <Form.Control 
                                    name="latitude"
                                    value={boulderFormState.latitude || ''}
                                    onChange={handleBoulderFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Longitude</Form.Label>
                                <Form.Control 
                                    name="longitude"
                                    value={boulderFormState.longitude || ''}
                                    onChange={handleBoulderFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Boulder Image URL</Form.Label>
                                <Form.Control 
                                    name="boulderImgURL"
                                    value={boulderFormState.boulderImgURL || ''}
                                    onChange={handleBoulderFormChange}
                                />
                            </Form.Group>
                            <Button id="btnFormSubmit" variant="primary" type="submit" onClick={handleBoulderFormSubmit}>
                                <Link to='/home' id="editorSubmitBtn">Submit</Link>
                            </Button>
                        </Form>
                    </div>
                    <br></br>
                </>
                
                }

                {
                /* data needed to create new route: routeName, routeDescription, firstAscent, routeGrade, routeQuality, boulderID, routeImgURL, routeYoutubeEmbedURL */
                pageName === 'Route' && 
                <>
                    <div id='editorFormHolder'>
                        <h4>Create new route on boulder: {editorInfo.typeName}</h4>
                        <Form id="editorForm">
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Name</Form.Label>
                                <Form.Control 
                                    name="routeName"
                                    value={routeFormState.routeName}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Description</Form.Label>
                                <Form.Control 
                                    name="routeDescription"
                                    value={routeFormState.routeDescription}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>First Ascent</Form.Label>
                                <Form.Control 
                                    name="firstAscent"
                                    value={routeFormState.firstAscent}
                                    onChange={handleRouteFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Grade</Form.Label>
                                <Form.Control 
                                    name="routeGrade"
                                    value={routeFormState.routeGrade}
                                    onChange={handleRouteFormChange}
                                    placeholder="ex: v3"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Quality</Form.Label>
                                <Form.Control 
                                    name="routeQuality"
                                    value={routeFormState.routeQuality}
                                    onChange={handleRouteFormChange}
                                    placeholder="ex: 3 (out of 4 stars)"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Image URL</Form.Label>
                                <Form.Control 
                                    name="routeImgURL"
                                    value={routeFormState.routeImgURL}
                                    onChange={handleRouteFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Youtube Embed Link</Form.Label>
                                <Form.Control 
                                    name="routeYoutubeEmbedURL"
                                    value={routeFormState.routeYoutubeEmbedURL}
                                    onChange={handleRouteFormChange}
                                    placeholder="ex: https://www.youtube.com/watch?v=dOEeVdANMXE"
                                />
                            </Form.Group>
                            <Button id="btnFormSubmit" variant="primary" type="submit" onClick={handleRouteFormSubmit}>
                                <Link to='/home' id="editorSubmitBtn">Submit</Link>
                            </Button>

                        </Form>
                    </div>
                    <br></br>
                </>
                
                }

            

            <Footer />
        </>
    )
}

export default EditorPage;