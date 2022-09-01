import React, { useState } from 'react';

export const PageContext = React.createContext();

export const PageProvider = (props) => {
    const [pageName, setPageName] = useState('other');
  
    return (
      //passing in values from login state to use elsewhere in app
      <PageContext.Provider value={{pageName, setPageName}} {...props} />
    );
  };

export default PageProvider;