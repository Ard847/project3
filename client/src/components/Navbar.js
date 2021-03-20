// packages
import React, { useState } from 'react';
import {Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,} from 'reactstrap';

  //import logo
import Logo from './images/sortedOrange-01.png'
  
// styles
import './NavBar.css'


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
      <div>
        <Navbar className="sticky fixed-top" light expand="md">
          <NavbarBrand href="/"><img className="logo" src={Logo}/></NavbarBrand>
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
                <NavLink className="navLink" href="/contact">Instructions</NavLink>
              </NavItem>
            </Nav>
            <NavItem>
                <NavLink className="navLink" href="/logIn">Login</NavLink>
              </NavItem>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  

export default NavBar;