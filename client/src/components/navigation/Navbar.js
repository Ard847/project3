// packages
import React, { useContext, useState } from 'react';
import {Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,} from 'reactstrap';

  //import logo
import Logo from '../images/sortedOrange-01.png'
  
// styles
import './NavBar.css'
// context
import LoggedInContext from '../../context/LoggedInContext'

const NavBar = (props) => {
  const { loggedIn } = useContext(LoggedInContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar className="sticky fixed-top" light expand="md">
          <NavbarBrand href="/"><img className="logo" src={Logo} /></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto items" navbar>
              <NavItem>
                <NavLink className="navLink" href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navLink"href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navLink" href="/instructions">Instructions</NavLink>
              </NavItem>
              <NavItem>
                { loggedIn 
                ?<NavLink className="navLink" href="/logIn">Login</NavLink>
                :<NavLink className="navLink" href="/logIn">Login</NavLink>
                 }
              </NavItem>
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
  

export default NavBar;






















// packages
/*import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

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

export default Navbar;*/