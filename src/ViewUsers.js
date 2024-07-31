import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewUsers = ({ users, onDeleteUser, onEditUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [maxVisiblePages, setMaxVisiblePages] = useState(5); // Max number of visible page buttons

  // Function to handle change in items per page
  const handleItemsPerPageChange = (event) => {
    let selectedValue = Number(event.target.value);
    if (selectedValue > 50) {
      selectedValue = 50;
    }
    setItemsPerPage(selectedValue);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Calculate total number of pages based on current itemsPerPage
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Function to get current page's users
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Calculate start and end indexes for visible page numbers
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>View Users</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageUsers().map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dob}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.designation}</td>
              <td>{user.department}</td>
              <td>{user.gender}</td>
              <td className="action-buttons">
                <button onClick={() => onDeleteUser(user.id)}>Delete</button>
                <Link to={`/edit/${user.id}`}>
                  <button onClick={() => onEditUser(user)}>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-top card-body text-center">
        {/* Items per page selection */}
        <div className="form-group mb-3">
          <label htmlFor="itemsPerPageInput" className="form-label me-2"></label>
          <input
            id="itemsPerPageInput"
            className="form-control"
            type="number"
            min="1"
            max="50"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      <div className="border-top card-body text-center">
        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(startPage + index)}>{startPage + index}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
