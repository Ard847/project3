// packages
import React, { useContext, useState } from 'react';
import {Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,} from 'react-bootstrap';

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
        <Navbar expand="md">
          <Navbar.Brand href="/"><img className="logo" src={Logo} /></Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto items" navbar>
                <Nav.Link className="navLink" href="/">Home</Nav.Link>              
                <Nav.Link className="navLink"href="/about">About</Nav.Link>                            
                <Nav.Link className="navLink" href="/instructions">Instructions</Nav.Link>                            
                { loggedIn 
                ?<Nav.Link className="navLink" href="/logIn">My Households</Nav.Link>
                :<Nav.Link className="navLink" href="/logIn">Login</Nav.Link>
                 }
            </Nav>            
          </Navbar.Collapse>
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