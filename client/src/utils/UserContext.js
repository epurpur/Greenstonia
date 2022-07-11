import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserProvider = (props) => {
  const [userRole, setUserRole] = useState(0);
  
    return (
        //passing in values from useState to use elsewhere in app
        <UserContext.Provider value={{ userRole, setUserRole}} {...props} />
  );
};

export default UserProvider;