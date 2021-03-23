// packages
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// functions
import getSession from '../../functions/getSession';

// hooks
import useGetImages from '../../hooks/useGetImages';

// styles
import './DashNav.css';

//cloudinary
import { Image } from 'cloudinary-react';

const DashNav = ({ match, currentUser, toggelModal, toggelProfile }) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);

  const userID = getSession('id');
  
  const imageString = useGetImages().toString();
  // console.log('imageString =', imageString);

  const userStyle = {
    'backgroundColor': currentUser?.color,
    'borderRadius': '5px',
    'padding': '3px 6px',
  }


  return (
    <nav id='dash-nav'>

      <div id='user-profile'>
        <Image
          key={userID}
          cloudName='dii2emagu'
          publicId={imageString}
          className='user-img'
          alt='user image'
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
        <li className='nav-item'>
          <button onClick={toggelProfile}>User Profile</button>
        </li>
      </ul>
    </nav>

  )
}

export default DashNav;