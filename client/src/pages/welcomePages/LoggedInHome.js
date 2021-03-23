// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './LoggedInHome.css';

// components
import SortedTitles from '../welcomeTitles/SortedTitles';
import getSession from '../../functions/getSession';

const LoggedInHome = () => {

  const id = getSession('id');
  
  return (
    <>
      <SortedTitles />
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