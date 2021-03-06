// packages
import React, { useState, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
// styles
import './DashApp.css';
// context
import MembersContext from '../../context/MembersContext';
import TaskContext from '../../context/TaskContext';
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

  if (location.aboutProps) {
    saveToSession('houseName', location.aboutProps.houseName);
  }

  // state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);

  const { refreshMembers, handleHouseID } = useContext(MembersContext);
  const { taskHouseID } = useContext(TaskContext);
  // console.log(members);
  const houseID = parseInt(match.params.householdID);
  saveToSession('houseID', houseID);

  useEffect(() => {
    handleHouseID(houseID);
    taskHouseID(houseID);
  }, [taskHouseID, handleHouseID, houseID])

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
    refreshMembers();
    setModalProfile(false);
  }

  // console.log('match.url =', match.url);
  return (
    <>

      <section id='dashboard-content'>

        <DashNav match={match} toggelModal={handleToggelModal} toggelProfile={handleToggelProfile} />
        <article id='dash-body'>
          <Route exact path={`${match.url}`} component={DashHome} />
          <Route exact path={`${match.url}/task-manager`} render={(props) => (
            <DashTasks {...props} />
          )} />

        </article>

      </section>

      {modalOpen && <Modal closeModal={handleCloseModal} ><CreateTaskForm /></Modal>}
      {modalProfile && <Modal closeModal={handleCloseProfile} ><UserProfile refresh={() => refreshMembers()} /></Modal>}

    </>
  )

}

export default DashApp;