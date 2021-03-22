// packages
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './NavBar.css'

// context
import LoggedInContext from '../../context/LoggedInContext'


const Navbar = () => {
  const { loggedIn } = useContext(LoggedInContext);

  return (
    <nav id='main-nav'>
      <p id='brand'>Logo</p>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      { loggedIn 
      ? <NavLink to='/logIn'>My Households </NavLink>
      : <NavLink to='/logIn'>Log In </NavLink>
    }
      <NavLink to='/signUp'>Sign Up</NavLink>
    </nav>
  )
}

export default Navbar;