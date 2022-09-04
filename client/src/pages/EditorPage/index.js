import React from 'react'
import { useLocation } from 'react-router-dom';

const EditorPage = () => {

    // data passed in as state from either the area, boulder, or route page the user wants to edit
    // this information will be used to make mutations to create new areas, boulders, or routes in the database
    let editorData = useLocation();
    console.log('EDITORDATA', editorData.state);

    return (
        <div>EditorPage</div>
    )
}

export default EditorPage;