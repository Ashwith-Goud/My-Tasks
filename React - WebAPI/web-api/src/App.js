import React from 'react';
import { UserProvider } from './context/Usercontext';
import UserList from './components/Userlist';
import { PageWrapper, Title} from './styles/StyledComponents';

const App = () => (
  <UserProvider>
    <PageWrapper>
      <Title>Random User Data</Title>
      <UserList />
    </PageWrapper>
  </UserProvider>
);

export default App;

