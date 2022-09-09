import React, { useState } from "react";

export const CurrentlyEditingContext = React.createContext();

export const CurrentlyEditingProvider = (props) => {
    const [currentlyEditing, setCurrentlyEditing] = useState(false);

    return (
        //passing in values from editorInfo state to use elsewhere in app (specifically to use in editor page)
        <CurrentlyEditingContext.Provider value={{currentlyEditing, setCurrentlyEditing}} {...props} />    
    );
  };

export default CurrentlyEditingProvider;