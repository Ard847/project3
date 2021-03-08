// packages
import React, { useContext } from 'react';
import { NavLink, Route } from 'react-router-dom';

// styles
import './HomePage.css';

// context
import LoggedInContext from "../context/LoggedInContext";



const HomePage = () => {

  const { loggedIn } = useContext(LoggedInContext);

  if (loggedIn === false) {

    return (
      <article id='home-content'>
        <h2>Log In or Sign Up to see your Households</h2>
      </article>
    )

  } else if (loggedIn === true) {

    return (
      <article id='home-content' className='flex'>

        <div id='create-household'>
          <NavLink 
            to='/createHousehold'
          >
            <img
              className='household-img'
              src=''
              alt=''
            />
            <p>Create New Household</p>
          </NavLink>
        </div>

        <div id='current-household' className='flex'>
          <div className='household'>
            <a href='#'>
              <img
                className='household-img'
                src=''
                alt=''
              />
              <p>Name Here</p>
            </a>
          </div>
          <div className='household'>
            <a href='#'>
              <img
                className='household-img'
                src=''
                alt=''
              />
              <p>Name Here</p>
            </a>
          </div>
        </div>

      </article>
    )

  }

}

export default HomePage;