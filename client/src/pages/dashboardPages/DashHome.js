// packages
import React, { useState } from 'react';

// styles
import './DashHome.css';

// components
import Clock from '../../components/Clock';

const DashHome = ({ match, location, members }) => {

  console.log(match);
  const houseID = parseInt(match.params.householdID);

  const [showInviteButton, setShowInviteButton] = useState(true);

  const handleShowHouseID = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowInviteButton(false);
  }

  const handleHideHouseID = () => {
    setTimeout(() => setShowInviteButton(true), 1500);
  }


  return (
    <div id='dash-home-content'>
      {/* <> */}
      <div id='dash-title' >
        <h2>Dashboard of {location.aboutProps.houseName}</h2>
        {showInviteButton && <button id='invite' onMouseDown={handleShowHouseID}> + Invite another Member </button>}
        {(showInviteButton === false) && (
          <div id='house-id' onMouseOut={handleHideHouseID}>
            <p>Your House ID is {houseID}</p>
          </div>
        )}
      </div>

      <div id='dash-intro' className='container'>
        <h4>Today's Date:
              <Clock day={true} time={true} />
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
      
    </div>
  )
};
export default DashHome;