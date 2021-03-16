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
import getSession from '../../functions/getSession';

// components
import DashNav from '../../components/DashNav';
import Modal from '../../components/Modal';

// pages
import DashHome from './DashHome';
import DashTasks from './DashTasks';


const DashApp = ({ match, location }) => {

  // console.log('match =', match);
  // console.log('location =', location);
  useSiteLocation(location);

  const userID = parseInt(match.params.id);
  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);
  
  if (location.aboutProps) {
    saveToSession('houseName', location.aboutProps.houseName);
  }
  
  const [currentUser, setCurrentUser] = useState({});
  const [ modalOpen, setModalOpen ] = useState(false);
  
  const members = useGetMembers();
  
  const handleToggelModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }
  
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
    <>
      <section id='dashboard-content' className='dashboard'>
        <Router >

          <DashNav match={match} currentUser={currentUser} toggelModal={handleToggelModal}/>
          <article id='dash-body'>
            <Route exact path={`${match.url}`} render={(props) => (
              <DashHome {...props} members={members} />

            )} />
            <Route exact path={`${match.url}/tasks`} component={DashTasks} />
            

          </article>

        </Router>
      </section>
      { modalOpen && <Modal closeModal={handleCloseModal}/> }
    </>
  )

}

export default DashApp;