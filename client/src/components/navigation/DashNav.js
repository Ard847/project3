// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './DashNav.css'

const DashNav = ({match, currentUser, toggelModal}) => {
  console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);

  const userStyle = {
    'backgroundColor': currentUser?.color,
    'borderRadius': '5px',
    'padding': '3px 6px',
  }

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
          (<p id='user-name' className='text-centre' style={userStyle}>{`${currentUser.firstName} ${currentUser.lastName}`}</p>)
        }
      </div>

      <ul>
        <li className='nav-item'>
          <NavLink to={`${match.url}`}>Dashboard Home</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to={`${match.url}/task-manager`}>Task Manager</NavLink>
        </li>
        <li className='nav-item'>
          <button onClick={toggelModal}>Create Task</button>
        </li>
      </ul>
    </nav>
  )
}

export default DashNav;