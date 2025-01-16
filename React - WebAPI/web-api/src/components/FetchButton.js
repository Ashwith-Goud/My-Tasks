import React, { useContext } from 'react';
import { UserContext } from '../context/Usercontext';
import { Button } from '../styles/StyledComponents';

const FetchButton = () => {
  const { setUsers, setLoading } = useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://randomuser.me/api/?results=30');
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={fetchData}>Fetch User Data</Button>;
};

export default FetchButton;
