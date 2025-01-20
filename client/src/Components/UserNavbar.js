import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserMenuItems } from './UserMenuItem.js';
import '../Styles/UserNavbar.css';

const UserNavbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleMenuToggle = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="UserNavbarItems">
      <h1 className="user-navbar-logo">UserPortal</h1>
      <div className="menu-icons" onClick={handleMenuToggle}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "user-nav-menu active" : "user-nav-menu"}>
        {UserMenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        <Link to="/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </ul>
    </nav>
  );
};

export default UserNavbar;
