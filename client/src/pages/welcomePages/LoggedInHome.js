// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

import './LoggedInHome.css';

import NavBar from '../../components/navigation/Navbar'

// components
import WelcomeTitles from '../../components/WelcomeTitles';
import getSession from '../../functions/getSession';

const LoggedInHome = () => {

  const id = getSession('id');
  
  return (
    <>
   <NavBar/>
      <section>
        <article id='home-content'>
          <h2>This is the Logged In Home Page </h2>
          <NavLink to={`/logIn/${id}`} >View Households</NavLink>
        </article>
      </section>
    </>
  )
}

export default LoggedInHome;