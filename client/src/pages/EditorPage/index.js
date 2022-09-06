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
    setPageName('other');
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
                pageName === 'Boulder' && <>create new boulder</>
                
                }

                {
                /* data needed to create new route: routeName, routeDescription, firstAscent, routeGrade, routeQuality, boulderID, routeImgURL, routeYoutubeEmbedURL */
                pageName === 'Route' && <>Create new route</>
                
                }

            

            <Footer />
        </>
    )
}

export default EditorPage;