// packages
import React, { useState } from 'react';

// styles
import './DashboardHome.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';
import useGetMembers from '../../hooks/useGetMembers';

// functions
import saveToSession from '../../functions/saveToSession';

// components
import Clock from '../../components/Clock';

const DashboardHome = ({ match, location }) => {

  // console.log('match =', match);
  // console.log(location);
  useSiteLocation(location);

  const members = useGetMembers();
  // console.log('members =', members);

  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);
  saveToSession('houseName', location.aboutProps.houseName);

  const [ showInviteButton, setShowInviteButton ] = useState(true);

  const handleShowHouseID = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowInviteButton(false);
  }

  const handleHideHouseID = () => {
    setTimeout(() => setShowInviteButton(true), 2000 );
  }


  return (
    <section id='dashboard-home-content' className='dashboard'>
      <nav id='dash-nav'>

        <div id='user-profile'>
          <img
            className='user-img'
            src=''
            alt=''
          />
          <p id='user-name' className='text-centre'>user name</p>
        </div>
      </nav>

      <article id='dash-body'>

        <div id='dash-title' className='container'>
          <h2>Dashboard of {location.aboutProps.houseName}</h2>
          { showInviteButton && <button id='invite' onMouseDown={handleShowHouseID}> + Invite another Member </button>}
          { (showInviteButton === false) && (
            <div id='house-id' onMouseOut={handleHideHouseID}>
              <p>Your House ID is {houseID}</p>
            </div>
          ) }
        </div>

        <div id='dash-intro' className='container'>
            <h4>Today's Date: 
              <Clock day={true} time={true}/>
              </h4>
        </div>

        <div id='dash-members' className='container'>
          {members.map((member) => {
            return (
              <div key={member.id} className='member-profile'>
                <img
                  className='member-img'
                  src=''
                  alt=''
                />
                <p id='user-name' className='text-centre'>{member.firstName} {member.lastName}</p>
              </div>
            )
          })}
        </div>
        <div id='dash-today-list' className='container'></div>
        <div id='dash-month-list' className='container'></div>

      </article>

    </section>
  )

}

export default DashboardHome;