import React, { useState } from "react";

export const EditorContext = React.createContext();

export const EditorProvider = (props) => {
    const [editorInfo, setEditorInfo] = useState();

    return (
        //passing in values from editorInfo state to use elsewhere in app (specifically to use in editor page)
        <EditorContext.Provider value={{editorInfo, setEditorInfo}} {...props} />    
    );
  };

export default EditorProvider;