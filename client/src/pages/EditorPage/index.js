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
    console.log('EDITOR CONTEXT INFO', editorInfo);
    console.log('PAGE CONTEXT', pageName)

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
                                    name="username"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Area Description</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Parking Description</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Approach Description</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Latitude</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Longitude</Form.Label>
                                <Form.Control 
                                    name="password"
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
                                    name="username"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Boulder Description</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Latitude</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Longitude</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Boulder Image URL</Form.Label>
                                <Form.Control 
                                    name="password"
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
                                    name="username"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Description</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>First Ascent</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Grade</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Quality</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Image URL</Form.Label>
                                <Form.Control 
                                    name="password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="m-3 loginModalText">
                                <Form.Label className='formLabel'>Route Youtube Embed Link</Form.Label>
                                <Form.Control 
                                    name="password"
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