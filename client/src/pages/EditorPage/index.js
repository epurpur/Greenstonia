import React, { useState, useContext } from 'react'

/* Components */

/* Styles */

/* Context */
import { EditorContext } from '../../utils/EditorContext';

const EditorPage = () => {

    // global user context variable of editor info state
    const { editorInfo, setEditorInfo } = useContext(EditorContext);
    console.log('EDITOR CONTEXT INFO', editorInfo);

    return (
        <>
            <div>EditorPage</div>
        </>
    )
}

export default EditorPage;