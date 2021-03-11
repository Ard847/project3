// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './ChooseHouse.css';

// hooks
import useGetHouseholds from '../../hooks/useGetHouseholds';

// components
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';


const ChooseHouse = () => {

  const households = useGetHouseholds();
  console.log('households =', households);

  const id = getSession('id');

  return (
    <>
        <WelcomeTitles />
        <section>
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
                    <NavLink to={`/dashboard/${id}/${household.id}`} >
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
        </section>
      </>
  )
}

export default ChooseHouse;