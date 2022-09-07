import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Form, Button } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";


/* Context */
import { EditorContext } from '../../utils/EditorContext';
import { PageContext } from '../../utils/PageContext';

const EditorPage = () => {

    // global user context variable of editor info state
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    const { pageName, setPageName } = useContext(PageContext);
    //console.log('EDITOR CONTEXT INFO', editorInfo);
    //console.log('PAGE CONTEXT', pageName)


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
    };




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
                            <Button id="btnFormSubmit" variant="primary" type="submit">
                                Submit
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
                                    required
                                />
                            </Form.Group>
                            <Button id="btnFormSubmit" variant="primary" type="submit">
                                Submit
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
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Grade</Form.Label>
                                <Form.Control 
                                    name="routeGrade"
                                    value={routeFormState.routeGrade}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Quality</Form.Label>
                                <Form.Control 
                                    name="routeQuality"
                                    value={routeFormState.routeQuality}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Image URL</Form.Label>
                                <Form.Control 
                                    name="routeImgURL"
                                    value={routeFormState.routeImgURL}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Youtube Embed Link</Form.Label>
                                <Form.Control 
                                    name="routeYoutubeEmbedURL"
                                    value={routeFormState.routeYoutubeEmbedURL}
                                    onChange={handleRouteFormChange}
                                    required
                                />
                            </Form.Group>
                            <Button id="btnFormSubmit" variant="primary" type="submit">
                                Submit
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