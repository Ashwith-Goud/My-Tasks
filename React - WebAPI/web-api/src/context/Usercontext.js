import React, { useState } from 'react';

const Usercontext = React.createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Usercontext.Provider value={{ users, setUsers, loading, setLoading}}>
      {children}
    </Usercontext.Provider>
  );
};

export {Usercontext, UserProvider};

