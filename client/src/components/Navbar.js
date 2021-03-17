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
          <NavbarBrand href="/"><img src={Logo}/></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto items" navbar>
              <NavItem>
                <NavLink style={{fontSize: '15px', letterSpacing: '0.05em', marginLeft: '20px'}} href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{fontSize: '15px', letterSpacing: '0.05em', marginLeft: '20px'}} href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{fontSize: '15px', color: 'white', letterSpacing: '0.05em', marginLeft: '20px'}} href="/contact">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{fontSize: '15px', color: 'white', letterSpacing: '0.05em', marginLeft: '20px'}} href="/logIn">Login</NavLink>
              </NavItem>
            </Nav>
            <NavItem>
                <NavLink style={{fontSize: '15px', color: 'black', letterSpacing: '0.05em', marginLeft: '20px'}} href="/signUp">Sign up</NavLink>
              </NavItem>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  

export default NavBar;