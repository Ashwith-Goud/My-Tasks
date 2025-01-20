import React from 'react';
import { Button } from '../styles/StyledComponents';

const FetchButton = ({ setUsers, setLoading, setDataFetched }) => {
  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const data = await response.json();
      setUsers(data.results); 
      setDataFetched(true); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Button onClick={fetchData}>Fetch User Data</Button>
  );
};

export default FetchButton;
