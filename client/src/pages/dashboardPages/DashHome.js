// packages
import React, { useEffect, useState } from 'react';

// styles
import './DashHome.css';

// components
import Clock from '../../components/Clock';
import List from '../../components/List';
import Modal from '../../components/Modal';
import LeaveHousehold from '../../components/LeaveHousehold';

// functions
import getSession from '../../functions/getSession';

// hooks
import useGetTasks from '../../hooks/useGetTasks';


const DashHome = ({ members, match }) => {

    // variables
  const houseID = parseInt(getSession('houseID'));
  const getHouseName = getSession('houseName');
  const houseName = getHouseName.replace(/['"]+/g, '');
  const userID = parseInt(getSession('id'));

  // hooks -------------------------------------------------------------------
  const [tasks, refreshTasks] = useGetTasks();

  // state --------------------------------------------------------------------
  const [showInviteButton, setShowInviteButton] = useState(true);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [monthTasks, setMonthTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);

  // Invite to household ------------------------------------------------------
  const handleShowHouseID = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowInviteButton(false);
  }

  const handleHideHouseID = () => {
    setTimeout(() => setShowInviteButton(true), 1500);
  }

  // call modal --------------------------------------------------------------
  const handleToggelModal = (task) => {
    // console.log('task =', task);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  // list data ----------------------------------------------------------------
  useEffect(() => {
    let todaysTaskData = [];
    let myTaskData = [];
    let assignedTaskData = [];
    let overdueTaskData = [];
    let completedData = [];
    if (tasks.length > 0) {

      tasks.forEach(task => {

        const todaysDate = new Date();
        // task range
        const startDate = new Date(task.nextDate);
        startDate.setDate(startDate.getDate() - Number(task.alertBefore));
        const endDate = new Date(task.nextDate);
        endDate.setDate(endDate.getDate() + Number(task.completeBy));
        const completedDate = new Date(task.completedDate);

        if ((startDate <= todaysDate && todaysDate <= endDate) && task.status === 'to-do') {
          // console.log('date is in range');
          todaysTaskData.push(task);
        }

        if ((startDate <= todaysDate && todaysDate <= endDate) && (task.userID === userID)) {
          // console.log('dates between');
          myTaskData.push(task);
        }

        if ((startDate <= todaysDate && todaysDate <= endDate) && (task.userID !== userID && task.status === 'assigned')) {
          // console.log('dates between');
          assignedTaskData.push(task);
        }

        if (endDate < todaysDate && task.status !== 'complete' && task.nextDate !== null) {
          // console.log('dates between');
          overdueTaskData.push(task);
        }

        if (completedDate <= todaysDate && task.status === 'complete') {
          completedData.push(task);
        }
      });
      setTodaysTasks(todaysTaskData);
      setMyTasks(myTaskData);
      setAssignedTasks(assignedTaskData);
      setOverdueTasks(overdueTaskData);
      setCompletedTasks(completedData);
    }

  }, [tasks]);

  useEffect(() => {
    let monthTaskData = [];
    if (tasks.length > 0) {

      tasks.forEach(task => {

        const todaysDate = new Date().toLocaleDateString();
        // console.log('todaysDate =', todaysDate);
        let todaysMonth = todaysDate.split('/');
        todaysMonth = todaysMonth[1];
        // console.log('todaysMonth =', todaysMonth);
        // task range
        const date = new Date(task.nextDate).toLocaleDateString();
        let dateMonth = date.split('/');
        dateMonth = dateMonth[1];
        if (todaysMonth === dateMonth && task.repeatEvery > 7) {
          monthTaskData.push(task);
        }

      });
      setMonthTasks(monthTaskData);
    }
  }, [tasks]);

  const onRefresh = (taskID, newStatus) => {
    console.log('here')
    refreshTasks(taskID, newStatus);
  }

  

  

  // render ------------------------------------------------------------------------
  return (
    <div id='dash-home-content'>
      {/* <> */}
      <div id='title-bar'>
      <div className='dash-title' >
        <h2>Dashboard of {houseName}</h2>
        {showInviteButton && <button id='invite' onMouseDown={handleShowHouseID}> + Invite another Member </button>}
        {(showInviteButton === false) && (
          <div id='house-id' onMouseOut={handleHideHouseID}>
            <p>Your House ID is {houseID}</p>
          </div>
        )}
      </div>
        <button onClick={handleToggelModal} id='leave-household'>Leave Household</button>
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
      <List title={"Today's Tasks"} id={'dash-today-list'} list={todaysTasks} refresh={onRefresh } />
      <div id='tasks-to-do'>
        <List title={"My Tasks"} id={'dash-my-list'} list={myTasks} refresh={onRefresh } />
        <List title={"Assigned Tasks"} id={'dash-assigned-list'} list={assignedTasks} refresh={onRefresh } />
      </div>
      <List title={"Coming up this month"} id={'dash-month-list'} list={monthTasks} refresh={onRefresh } />
      <div id='tasks-col-4' >
        <List title={"Over Due"} id={'dash-overdue-list'} list={overdueTasks} refresh={onRefresh } />
        <List title={"Completed"} id={'dash-complete-list'} list={completedTasks} refresh={onRefresh } />
      </div>
      { modalOpen && <Modal closeModal={handleCloseModal} ><LeaveHousehold match={match} /></Modal> }
    </div>
  )
};
export default DashHome;