import React, { useState } from 'react';
import { Card, CardFront, CardBack, ViewAddressSpan} from '../styles/StyledComponents';

const UserCard = ({ user, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Toggle card flip
  };

  return (
      <Card onClick={handleCardClick} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
        <CardFront>
          {!isFlipped && (
            <>
            <p><strong>Name:</strong> {user.name.first} {user.name.last}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <ViewAddressSpan>
              Click the Card to View Address
            </ViewAddressSpan>
            {/*
            <Button onClick={toggleAddress}>
              {showAddress ? 'Hide Address' : 'View Address'}
            </Button>
            */}
            </>
          )}
          </CardFront>

        <CardBack>
          {isFlipped && (
            <div>
              <p><strong>State:</strong> {user.location.state}</p>
              <p><strong>City:</strong> {user.location.city}</p>
              <p><strong>Country:</strong> {user.location.country}</p>
            </div>
          )}
        </CardBack>
      </Card>
  );
};

export default UserCard;
