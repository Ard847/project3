// packages
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// styles
import './DashApp.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';
import useGetMembers from '../../hooks/useGetMembers';

// functions
import saveToSession from '../../functions/saveToSession';

// components
import DashNav from '../../components/DashNav';

// pages
import DashHome from './DashHome';


const DashApp = ({ match, location }) => {

  console.log('match =', match);
  // console.log(location);
  useSiteLocation(location);

  const members = useGetMembers();
  // console.log('members =', members);

  const userID = parseInt(match.params.id)
  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);
  saveToSession('houseName', location.aboutProps.houseName);

  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      const user = await members.find(member => member.id === userID);
      // console.log('user =', user );
      // console.log('user.id =', user.id );
      setCurrentUser(user);
    }
    fetchUser();
  }, [members, userID]);


  return (
    <section id='dashboard-content' className='dashboard'>
      <Router >

        <DashNav currentUser={currentUser} />
        <article id='dash-body'>
        <DashHome match={match} location={location} members={members} />
          

        </article>

      </Router>
    </section>
  )

}

export default DashApp;