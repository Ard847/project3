// packages
import React, { useEffect, useState, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';

// context
import MediaContext from '../../context/MediaContext';

//font awesome packages
// import { faCalendar, faTasks } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// functions
import getSession from '../../functions/getSession';

// hooks
import useGetImages from '../../hooks/useGetImages';

// styles
import './DashNav.css';

// images
import person from '../../images/person.png';

//cloudinary
import { Image } from 'cloudinary-react';

const DashNav = ({ match, currentUser, toggelModal, toggelProfile }) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);

  const { isMobileDevice, isSmallScreen, isTabletDevice, isDesktopDevice, isLargeScreen } = useContext(MediaContext);
  const content = useRef(null);

  const userID = getSession('id');
  const imageString = useGetImages();
  console.log('imageString =', !!imageString);
  const userStyle = {
    'backgroundColor': currentUser?.color,
    'borderRadius': '30px',
    'padding': '3px 12px',
    'color': '#fff',
    'fontWeight': '500',
    'boxShadow': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  }

  // state
  const [activeState, setActiveState] = useState('');
  const [activeStyle, setActiveStyle] = useState('');
  const [contentWidth, setContentWidth] = useState('0px');

  // console.log('activeState =', activeState);
  // console.log('activeStyle =', activeStyle);
  // console.log('contentWidth =', contentWidth);

  let navAttr;
  if (isTabletDevice || isSmallScreen || isMobileDevice) {
    navAttr = {
      ref: content,
      style: {
        width: contentWidth,
      },
      className: "collapse-dash-content",
    }
  } else {
    navAttr = {
      ref: null,
      style: null,
      className: "",
    }
  }

  const toggelCollapse = () => {

    setActiveState(activeState === '' ? 'active' : '');
    setActiveStyle(activeStyle === '' ? 'active-style' : '');
    // console.log('content.current.scrollWidth =', content.current.scrollWidth);
    setContentWidth(
      activeState === "active" ? "0px" : '180px'
    );

  }

  console.log('contentWidth =', contentWidth);

  return (<>

    {
      (isTabletDevice || isSmallScreen || isMobileDevice) && (
        <button
          id='collapsed-dash-menu'
          className={`${activeState}`}
          onClick={toggelCollapse}
        >
          <div id="bar1" className={`${activeStyle}`}></div>
          <div id="bar2" className={`${activeStyle}`}></div>
          <div id="bar3" className={`${activeStyle}`}></div>
        </button>
      )
    }
    <nav
      id='dash-nav'
      ref={navAttr.ref}
      style={navAttr.style}
      className={navAttr.className}
    >
      <div id='user-profile'>
        {imageString
          ? <Image
            key={userID}
            cloudName='dii2emagu'
            publicId={imageString}
            className='user-img'
            alt='user image'
          />
          :
          <img
            className='user-img'
            src={person}
            alt='generic person'
          />
        }
        {
          (currentUser) &&
          (<p id='user-name' className='text-centre users-name' style={userStyle}>{`${currentUser.firstName} ${currentUser.lastName}`}</p>)
        }
      </div>

      <ul>
        <button className="nav-item" onClick={toggelProfile}>User Profile</button>

        <li className='nav-item'>
          {/* <FontAwesomeIcon className="dash-icon" icon={faCalendar} /> */}
          <NavLink to={`${match.url}`}>Dashboard Home</NavLink>
        </li>
        <li className='nav-item'>
          {/* <FontAwesomeIcon className="dash-icon" icon={faTasks} /> */}
          <NavLink to={`${match.url}/task-manager`}>Task Manager</NavLink>
        </li>

        <button className="nav-item" onClick={toggelModal}>Create Task</button>

      </ul>
    </nav>

  </>)
}

export default DashNav;