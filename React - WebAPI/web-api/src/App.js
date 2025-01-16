import React from 'react';
import { UserProvider } from './context/Usercontext';
import FetchButton from './components/FetchButton';
import UserList from './components/Userlist';
import { PageWrapper, Title } from './styles/StyledComponents';

const App = () => (
  <UserProvider>
    <PageWrapper>
      <Title>Random User Data</Title>
      <FetchButton />
      <UserList />
    </PageWrapper>
  </UserProvider>
);

export default App;
