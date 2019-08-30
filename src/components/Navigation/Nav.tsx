import React from 'react';
import './NavStyle.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <nav className="nav-style">
        <Link to='/'>
            <h2>Logo</h2>
        </Link>
          <ul className="nav-links">
            <Link to='/about'>
                <li>About</li>
            </Link>
            <Link to='/shop'>
                <li>Shop</li>
            </Link>
          </ul>

      </nav>
    ); 
  }
}

export default Nav;