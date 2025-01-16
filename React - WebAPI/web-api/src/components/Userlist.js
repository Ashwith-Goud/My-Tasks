import React, { useContext } from 'react';
import { UserContext } from '../context/Usercontext';
import UserCard from  './Usercard';
import { CardGrid } from '../styles/StyledComponents';

const UserList = () => {
  const { users, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  return (
    <CardGrid>
      {users.map((user, index) => (
        <UserCard key={index} user={user} index={index} />
      ))}
    </CardGrid>
  );
};

export default UserList;
