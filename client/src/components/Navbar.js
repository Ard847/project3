// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './NavBar.css'


const Navbar = () => {
  return (
    <nav>
      <p id='brand'>Logo</p>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/logIn'>Log In </NavLink>
      <NavLink to='/signUp'>Sign Up</NavLink>
    </nav>
  )
}

export default Navbar;