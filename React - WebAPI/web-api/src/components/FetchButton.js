import React, { useContext } from 'react';
import { Usercontext } from '../context/Usercontext';
import { Button } from '../styles/StyledComponents';

const FetchButton = ({ setDataFetched }) => {
  const { setUsers, setLoading } = useContext(Usercontext);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const data = await response.json();
      setUsers(data.results);
      setDataFetched(true); // Set dataFetched to true after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={fetchData}>Fetch User Data</Button>;
};

export default FetchButton;

