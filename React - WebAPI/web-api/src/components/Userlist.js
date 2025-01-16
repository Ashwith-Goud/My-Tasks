import React, { useContext, useState } from 'react';
import { Usercontext } from '../context/Usercontext';
import UserCard from './Usercard';
import { CardGrid, StyledSearchInput, PaginationControls } from '../styles/StyledComponents';
import FetchButton from './FetchButton';

const UserList = () => {
  const { users, loading } = useContext(Usercontext);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 

  const USERS_PER_PAGE = 30;

  // Filter users by name
  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // Get users for the current page
  const usersToDisplay = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {!dataFetched && <FetchButton setDataFetched={setDataFetched} />}

      {dataFetched && (
        <>
          <StyledSearchInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <CardGrid>
            {usersToDisplay.map((user, index) => (
              <UserCard key={index} user={user} index={index} />
            ))}
          </CardGrid>

          {/* Page Controls */}
          {totalPages > 1 && (
            <PaginationControls>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </PaginationControls>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
