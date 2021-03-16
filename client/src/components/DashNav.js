// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './DashNav.css'

const DashNav = ({match, currentUser, toggelModal}) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);
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
          <NavLink to={`${match.url}`}>Dashboard Home</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to={`${match.url}/tasks`}>Tasks</NavLink>
        </li>
        <li className='nav-item'>
          <button onClick={toggelModal}>Create Task</button>
        </li>
        <li className='nav-item'>Budget Tracker</li>
      </ul>
    </nav>
  )
}

export default DashNav;