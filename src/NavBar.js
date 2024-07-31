import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setShowViewUsers }) => {
  const handleViewClick = () => {
    setShowViewUsers(true);
  };

  const handleCreateClick = () => {
    setShowViewUsers(false);
  };

  return (
    <nav style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>View</NavLink>
        </li>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <NavLink to="/create" style={{ textDecoration: 'none', color: 'black' }}>Create</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
