import React, { useState } from 'react';
import { Card, Address, Button } from '../styles/StyledComponents';

const UserCard = ({ user, index }) => {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <Card>
      <p><strong>Name:</strong> {user.name.first} {user.name.last}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <Button onClick={() => setShowAddress(!showAddress)}>
        {showAddress ? 'Hide Address' : 'View Address'}
      </Button>
      {showAddress && (
        <Address>
          <p><strong>State:</strong> {user.location.state}</p>
          <p><strong>City:</strong> {user.location.city}</p>
          <p><strong>Country:</strong> {user.location.country}</p>
        </Address>
      )}
    </Card>
  );
};

export default UserCard;
