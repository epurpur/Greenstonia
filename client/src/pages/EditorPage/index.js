import React, { useState, useContext } from 'react'

/* Components */


/* Styles */

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

            <p>Current Info</p>
            {pageName === 'Area' && <>Create new area</>}
            {pageName === 'Boulder' && <>create new boulder</>}
            {pageName === 'Route' && <>Create new route</>}
        </>
    )
}

export default EditorPage;