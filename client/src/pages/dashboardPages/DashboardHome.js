// packages
import React, { useEffect } from 'react';

// styles
import './DashboardHome.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';
import useGetMembers from '../../hooks/useGetMembers';

// functions
import fetcher from '../../functions/fetcher';
import saveToSession from '../../functions/saveToSession';

const DashboardHome = ({ match, location }) => {

  console.log('match =', match);
  console.log(location);
  useSiteLocation(location);

  const members = useGetMembers();
  console.log('members =', members);

  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);
  saveToSession('houseName', location.aboutProps.houseName);


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

        </div>
        <div id='dash-intro' className='container'></div>
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