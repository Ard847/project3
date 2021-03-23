// packages
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

//images
import Logo from '../../images/sortedOrange-01.png';

// styles
import './NavBar.css';

// context
import LoggedInContext from '../../context/LoggedInContext';


const NavBar = () => {
  const { loggedIn } = useContext(LoggedInContext);

  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <nav id='main-nav' className="mr-auto items" >
      <NavLink to="/"><img id="logo" src={Logo} /></NavLink>
      <NavLink className="navLink" to='/'>Home</NavLink>
      <NavLink className="navLink" to='/about'>About</NavLink>
      <NavLink className="navLink" to="/instructions">Instructions</NavLink>
      { loggedIn
        ? <NavLink className="navLink" to='/logIn'>My Households </NavLink>
        : <NavLink className="navLink" to='/logIn'>Log In </NavLink>
      }
      <NavLink className="navLink" to='/signUp'>Sign Up</NavLink>
    </nav>
  );
}


export default NavBar;