// packages
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTasks, faCalendar, faPoundSign } from '@fortawesome/free-solid-svg-icons';

// styles
import './DashNav.css'

const SidebarContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: left;
 height: 100vh;
 background-color: #252529;
 color: #fff;
 `;

 const SidebarMenu = styled.ul`
 display: flex;
 align-items: left;
 flex-direction: column;
 list-style: none;
 width: 100%;
 padding: 0px 20px;
 margin-top: 60px;
 `;

 const SidebarMenuItem = styled.li`
 margin-top: 20px;
 display: flex;
 width: 100%;
 height: 40px;
 align-items: center;
 padding-left: 30px;
 &:hover {
     background: rgba(255, 255, 255, 0.05);
     box-shadow: inset 3px 0 0 0 #ffffff;
     cursor: pointer;
 }
 `;

 const MenuSignOut = styled.div`
 border-top: 1px solid #2e2e33;
 font-size: 14px;
 line-height: 1.5;
 font-weight: 500;
 height: 45px;
 color: #fff;
 margin: 200px 30px 60px 30px;
 padding:20px 0px 0px 30px;
 &:hover {
     background: rgba(255, 255, 255, 0.05);
     box-shadow: inset 3px 0 0 0 #ffffff;
     cursor: pointer;
 }
 `;

const DashNav = ({match, currentUser}) => {
  // console.log('currentUser =', currentUser);
  // console.log('match dash nav =', match);
  return (
  <SidebarContainer>
    <SidebarMenu>
    <nav className="nav-container" id='dash-nav'>
      
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
      <ul className='sideBarMen'>
      
      <SidebarMenuItem>
        <FontAwesomeIcon className="fontIcons" icon={faClipboard} />
          <NavLink className="labels" to={`${match.url}`}>Dashboard Home</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
        <FontAwesomeIcon className="fontIcons" icon={faTasks} />
          <NavLink className="labels" to={`${match.url}/tasks`}>Tasks</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
        <FontAwesomeIcon className="fontIcons" icon={faCalendar} />
          <NavLink className="labels" to={`${match.url}/calendar`}>Calendar</NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
        <FontAwesomeIcon className="fontIcons" icon={faPoundSign} />
          <NavLink className="labels" to={`${match.url}/tasks`}>Budget Tracker</NavLink>
          </SidebarMenuItem>
        
      </ul>
    </nav>
    <MenuSignOut>Sign Out</MenuSignOut>
     </SidebarMenu>
    </SidebarContainer>
  )
}

export default DashNav;