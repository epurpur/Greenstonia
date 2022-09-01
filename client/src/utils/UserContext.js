import React, { useState } from 'react';

export const UserContext = React.createContext();


const UserProvider = (props) => {
  const [login, setLogin] = useState(false);

  return (
    //passing in values from login state to use elsewhere in app
    <UserContext.Provider value={{login, setLogin}} {...props} /> //for some reason doesn't work without the props
  );
};

export default UserProvider;
