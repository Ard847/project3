// packages
import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// context
import MediaContext from '../../context/MediaContext';
// styles
import './DashNav.css';
// images
import person from '../../images/person.png';
//font awesome packages
import { faCalendar, faTasks, faUser, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// functions
import getSession from '../../functions/getSession';
// context
import MembersContext from '../../context/MembersContext';
//cloudinary
import { Image } from 'cloudinary-react';


const DashNav = ({ match, toggelModal, toggelProfile }) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);

  const { isMobileDevice, isSmallScreen, isTabletDevice } = useContext(MediaContext);
  const { members } = useContext(MembersContext);
  const content = useRef(null);

  // console.log('members dash nav =', members);
  const userID = getSession('id');


  // state
  const [activeState, setActiveState] = useState('');
  const [activeStyle, setActiveStyle] = useState('');
  const [contentWidth, setContentWidth] = useState('0px');
  const [currentUser, setCurrentUser] = useState({});
  const [imageString, setImageString] = useState('');
  // console.log('activeState =', activeState);
  // console.log('activeStyle =', activeStyle);
  // console.log('contentWidth =', contentWidth);
  //console.log('currentuser =', currentUser);

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

  const userStyle = {
    'backgroundColor': currentUser?.color,
    'borderRadius': '30px',
    'padding': '3px 12px',
    'color': '#fff',
    'fontWeight': '500',
    'boxShadow': 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  }

  const toggelCollapse = () => {

    setActiveState(activeState === '' ? 'active' : '');
    setActiveStyle(activeStyle === '' ? 'active-style' : '');
    // console.log('content.current.scrollWidth =', content.current.scrollWidth);
    setContentWidth(
      activeState === "active" ? "0px" : '180px'
    );

  }

  useEffect(() => {
    
    if(members !== null){
      const user = members.find(member => member.id === userID);
      // console.log('current user');
      // console.log('userID =', userID , typeof userID);
      // console.log('user =', user );

      if(user){
        // console.log('user.image =', user.image );
        setImageString(user.image);
      }
      setCurrentUser(user);

    }
    
  }, [members, userID]);

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
        {imageString !== ''
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
        <button className="nav-item" onClick={toggelProfile}><FontAwesomeIcon className="dash-icon" icon={faUser} />User Profile</button>

        <li className='nav-item'>
          <FontAwesomeIcon className="dash-icon" icon={faCalendar} />
          <NavLink to={`${match.url}`}>Dashboard Home</NavLink>
        </li>
        <li className='nav-item'>
          <FontAwesomeIcon className="dash-icon" icon={faTasks} />
          <NavLink to={`${match.url}/task-manager`}>Task Manager</NavLink>
        </li>

        <button className="nav-item" onClick={toggelModal}><FontAwesomeIcon className="dash-icon" icon={faThumbtack} />Create Task</button>

      </ul>
    </nav>

  </>)
}

export default DashNav;