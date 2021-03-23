// packages
import React, { useEffect, useState} from 'react';
import { Route} from 'react-router-dom';

// styles
import './DashApp.css';

// hooks
import useGetMembers from '../../hooks/useGetMembers';

// functions
import saveToSession from '../../functions/saveToSession';

// components
import DashNav from '../../components/navigation/DashNav';
import Modal from '../../components/Modal';
import CreateTaskForm from '../../components/forms/CreateTaskForm';
import UserProfile from '../../components/UserProfile';

// pages
import DashHome from './DashHome';
import DashTasks from './DashTasks';


const DashApp = ({ match, location }) => {

  // console.log('match =', match);
  // console.log('location =', location);

  const userID = parseInt(match.params.id);
  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);

  if (location.aboutProps) {
    saveToSession('houseName', location.aboutProps.houseName);
  }

  const [currentUser, setCurrentUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);

  const members = useGetMembers('dash-app');
  // console.log(members);


  const handleToggelModal = () => {
    setModalOpen(true);
  }

  
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  
  const handleToggelProfile = () => {
    setModalProfile(true);
  }

  const handleCloseProfile = () => {
    setModalProfile(false);
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

  // console.log('match.url =', match.url);
  return (
    <>
      
        <section id='dashboard-content' className='dashboard'>

          <DashNav match={match} currentUser={currentUser} toggelModal={handleToggelModal} toggelProfile={handleToggelProfile} />
          <article id='dash-body'>
            <Route exact path={`${match.url}`} render={(props) => (
              <DashHome {...props} members={members} />
            )}
            />
            <Route exact path={`${match.url}/task-manager`} render={(props) => (
              <DashTasks {...props} />
            )} />
            
          </article>

        </section>
        
        {modalOpen && <Modal closeModal={handleCloseModal} ><CreateTaskForm /></Modal>}
        {modalProfile && <Modal closeModal={handleCloseProfile} ><UserProfile /></Modal>}
      
    </>
  )

}

export default DashApp;