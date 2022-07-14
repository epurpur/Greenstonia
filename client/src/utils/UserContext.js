import React, { useState } from 'react';

export const UserContext = React.createContext();


const UserProvider = (props) => {
  const [login, setLogin] = useState({
    //setting initial value of login to 0
    login: 0
  });

  return (
    //passing in values from login state to use elsewhere in app
    <UserContext.Provider value={{login, setLogin}} {...props} /> //for some reason doesn't work without the props
  );
};

export default UserProvider;