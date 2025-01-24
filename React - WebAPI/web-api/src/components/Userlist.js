import React, { useContext, useState } from 'react';
import { Usercontext } from '../context/Usercontext';
import UserCard from './Usercard';
import { CardGrid, StyledSearchInput, PaginationControls, TopBar } from '../styles/StyledComponents';
import FetchButton from './FetchButton';

const UserList = () => {
  const { users, setUsers, loading, setLoading } = useContext(Usercontext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetched, setDataFetched] = useState(false); // Track if data is fetched

  const USERS_PER_PAGE = 30;
  const TOTAL_USERS = 100; 

  const totalPages = Math.ceil(TOTAL_USERS / USERS_PER_PAGE);

  // Get users for the current page
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const usersToDisplay = users.slice(startIndex, endIndex);

  // Filter current page users based on the search term
  const filteredUsers = usersToDisplay.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {!dataFetched && <FetchButton setUsers={setUsers} setLoading={setLoading} setDataFetched={setDataFetched} />}
      {dataFetched && (
        <>
          <TopBar>
            <StyledSearchInput
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <PaginationControls>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              > Previous </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1,totalPages))}
                disabled={currentPage === totalPages}
              > Next </button>
            </PaginationControls>
          </TopBar>

          <CardGrid>
            {filteredUsers.map((user, index) => (
              <UserCard key={index} user={user} index={index} />
            ))}
          </CardGrid>
        </>
      )}
    </div>
  );
};

export default UserList;

