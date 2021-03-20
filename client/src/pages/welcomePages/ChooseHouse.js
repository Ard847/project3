// packages
import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';

// styles
import './ChooseHouse.css';

// hooks
import useGetHouseholds from '../../hooks/useGetHouseholds';

// components
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';


const ChooseHouse = () => {
  const households = useGetHouseholds();
  // console.log('households =', households)
  const id = getSession('id');
  let token = getSession('token').split('"')
  token = token[1]
  
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/${id}`,"Get",'',token)
      console.log(response)
    } 
    fetchImages()
  },[])
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
                  <NavLink 
                    to={{
                      pathname: `/dashboard/${id}/${household.id}`,
                      aboutProps: { houseName: household.houseName },
                    }} >
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