import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{ users, setUsers, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
