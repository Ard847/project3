// packages
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './HomePage.css';

// context
import LoggedInContext from "../context/LoggedInContext";

// hooks
import useGetHouseholds from '../hooks/useGetHouseholds';
import useSiteLocation from '../hooks/useSiteLocation';



const HomePage = ({location}) => {

  const { loggedIn } = useContext(LoggedInContext);
  useSiteLocation(location);

  const households = useGetHouseholds();
  console.log('households =', households);

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

          {households.map((household) => {
            return (
              <div key={household.id} className='household'>
                <NavLink to={`/dashboard/${household.id}`} >
                  <img
                    className='household-img'
                    src=''
                    alt=''
                  />
                  <p>{household.houseName}</p>
                </NavLink>
              </div>
            )
          })}

        </div>

      </article>
    )

  }

}

export default HomePage;