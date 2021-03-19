// packages
import React, { useEffect, useState } from 'react';

// styles
import './DashHome.css';

// components
import Clock from '../../components/Clock';
import List from '../../components/List';

// functions
import getSession from '../../functions/getSession';

// hooks
import useGetTasks from '../../hooks/useGetTasks';


const DashHome = ({ members }) => {

  // variables
  const houseID = parseInt(getSession('houseID'));
  const getHouseName = getSession('houseName');
  const houseName = getHouseName.replace(/['"]+/g, '');
  const userID = parseInt(getSession('id'));

  // hooks -------------------------------------------------------------------
  const [ tasks, ] = useGetTasks();

  // state --------------------------------------------------------------------
  const [showInviteButton, setShowInviteButton] = useState(true);
  const [ todaysTasks, setTodaysTasks ] = useState([]);
  const [ myTasks, setMyTasks ] = useState([]);
  const [ assignedTasks, setAssignedTasks ] = useState([]);
  const [ monthTasks, setMonthTasks ] = useState([]);
  const [ overdueTasks, setOverdueTasks] = useState([]);

  // Invite to household ------------------------------------------------------
  const handleShowHouseID = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowInviteButton(false);
  }

  const handleHideHouseID = () => {
    setTimeout(() => setShowInviteButton(true), 1500);
  }

  // list data ----------------------------------------------------------------
  useEffect(() => {
    let todaysTaskData = [];
    let myTaskData = [];
    let assignedTaskData = [];
    let overdueTaskData = [];
    if (tasks.length > 0){

      tasks.forEach(task => {
        
        const todaysDate = new Date();
        // task range
        const startDate = new Date(task.nextDate);
        startDate.setDate(startDate.getDate() - Number(task.alertBefore));
        const endDate = new Date(task.nextDate);
        endDate.setDate(endDate.getDate() + Number(task.completeBy));
       
        if( (startDate <= todaysDate && todaysDate <= endDate) && task.status === 'to-do' ){
          // console.log('date is in range');
          todaysTaskData.push(task);
        }

        if( (startDate <= todaysDate && todaysDate <= endDate) && (task.userID === userID) ){
          // console.log('dates between');
          myTaskData.push(task);
        }

        if( (startDate <= todaysDate && todaysDate <= endDate) && (task.userID !== userID) ){
          // console.log('dates between');
          assignedTaskData.push(task);
        }

        if( endDate < todaysDate && task.status !== 'complete' ){
          // console.log('dates between');
          overdueTaskData.push(task);
        }
      });
      setTodaysTasks(todaysTaskData);
      setMyTasks(myTaskData);
      setAssignedTasks(assignedTaskData);
      setOverdueTasks(overdueTaskData);
    }

  }, [tasks]);

  useEffect(() => {
    let monthTaskData = [];
    if (tasks.length > 0){

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
        if( todaysMonth === dateMonth && task.repeatEvery > 7 ){
          monthTaskData.push(task);
        }

      });
      setMonthTasks(monthTaskData);
    }
  }, [tasks]);

 

  // render ------------------------------------------------------------------------
  return (
    <div id='dash-home-content'>
      {/* <> */}
      <div className='dash-title' >
        <h2>Dashboard of {houseName}</h2>
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
      <List title={"Today's Tasks"} id={'dash-today-list'} list={todaysTasks}/>
      <div id='tasks-to-do'>
        <List title={"My Tasks"} id={'dash-my-list'} list={myTasks}/>
        <List title={"Assigned Tasks"} id={'dash-assigned-list'} list={assignedTasks}/>
      </div>
      <List title={"Coming up this month"} id={'dash-month-list'} list={monthTasks}/>
      <List title={"Over Due"} id={'dash-overdue-list'} list={overdueTasks}/>
    </div>
  )
};
export default DashHome;