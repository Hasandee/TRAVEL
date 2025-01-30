// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import '../Styles/UserNavbar.css';
// import { UserMenuItems } from '../Components/UserMenuItem.js';

// class UserNavbar extends Component {
//   state = { clicked: false };

//   handleClick = () => {
//     this.setState({ clicked: !this.state.clicked });
//   };

//   render() {
//     return (
//       <nav className="user-navbar">
//         <h1 className="user-navbar-logo">ExploreLanka</h1>
//         <div className="user-menu-icons" onClick={this.handleClick}>
//           <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
//         </div>
//         <ul className={this.state.clicked ? 'user-nav-menu active' : 'user-nav-menu'}>
//           {UserMenuItems.map((item, index) => (
//             <li key={index}>
//               <Link className={item.cName} to={item.url}>
//                 <i className={item.icon}></i>
//                 {item.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     );
//   }
// }

// export default UserNavbar;
