// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './DashNav.css'

const DashNav = ({currentUser}) => {
  // console.log('currentUser =', currentUser);
  return (
    <nav id='dash-nav'>

      <div id='user-profile'>
        <img
          className='user-img'
          src=''
          alt=''
        />
        {
          (currentUser) &&
          (<p id='user-name' className='text-centre'>{`${currentUser.firstName} ${currentUser.lastName}`}</p>)
        }
      </div>

      <ul>
        <li className='nav-item'>
          {/* <NavLink>Tasks</NavLink> */}
          Tasks
        </li>
        <li className='nav-item'>Calendar</li>
        <li className='nav-item'>Budget Tracker</li>
      </ul>
    </nav>
  )
}

export default DashNav;