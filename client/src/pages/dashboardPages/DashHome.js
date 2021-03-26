// packages
import React, { useEffect, useState, useContext } from 'react';
// styles
import './DashHome.css';
// images
import person from '../../images/person.png';
// context
import TaskContext from '../../context/TaskContext';
import MembersContext from '../../context/MembersContext';
// components
import Clock from '../../components/Clock';
import List from '../../components/List';
import Modal from '../../components/Modal';
import LeaveHousehold from '../../components/LeaveHousehold';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';

//cloudinary
import { Image } from 'cloudinary-react';



const DashHome = ({ match }) => {

  // variables
  const houseID = parseInt(getSession('houseID'));
  const getHouseName = getSession('houseName');
  const houseName = getHouseName.replace(/['"]+/g, '');
  const userID = parseInt(getSession('id'));
  let token = getSession('token').split('"');
  token = token[1];

  // hooks -------------------------------------------------------------------
  // const [tasks, refreshTasks] = useGetTasks();
  // context -----------------------------------------------------------------
  const { tasks, refreshTasks } = useContext(TaskContext);
  const { members } = useContext(MembersContext);
  // console.log('members =', members );
  // state --------------------------------------------------------------------
  const [showInviteButton, setShowInviteButton] = useState(true);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [monthTasks, setMonthTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageIds, setImageIds] = useState([]);

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
  //Fetch user images
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetcher(`/api/images/user/${houseID}&${userID}`, 'GET', '', token);
      //console.log(response)
      setImageIds(response.images);
      //console.log(imageIds)
    }
    fetchImages();
  }, [token, userID, houseID]);

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

        if ((startDate <= todaysDate && todaysDate <= endDate) && (task.status === 'to-do' || task.status === 'progress') && task.userID === null) {
          // console.log('date is in range');
          todaysTaskData.push(task);
        }

        if ((startDate <= todaysDate && todaysDate <= endDate) && (task.userID === userID)) {
          // console.log('dates between');
          myTaskData.push(task);
        }

        if ((startDate <= todaysDate && todaysDate <= endDate) && ((task.userID !== userID && task.userID !== null) && (task.status === 'assigned' || task.status === 'progress'))) {
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

  }, [tasks, userID]);

  useEffect(() => {
    let monthTaskData = [];
    if (tasks !== undefined) {
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
    }
  }, [tasks]);

  const onRefresh = (taskID, newStatus) => {
    refreshTasks(taskID, newStatus);
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  // render ------------------------------------------------------------------------
  return (
    <div id='dash-home-content'>
      
      <div id='title-bar'>
        <div className='dash-title' >
          <h2>Dashboard of {houseName}</h2>
          {showInviteButton && <button className="btn-style" id='invite' onMouseDown={handleShowHouseID}> + Invite another Member </button>}
          {(showInviteButton === false) && (
            <div id='house-id' onMouseOut={handleHideHouseID}>
              <p>Your House ID is {houseID}</p>
            </div>
          )}
        </div>
        <button className="btn-style" onClick={handleToggelModal} id='leave-household'>Leave Household</button>
      </div>

      <div id='dash-intro' className='container'>
        <h4>
              <Clock day={true} time={true} />
        </h4>
        <p> 
          Welcome to your family dashboard. 
          We are delighted to have you here. 
          Invite as many family members as you wish. 
        </p>
      </div>

      <div id='dash-members' className='container'>

        {members.map((member, index) => {
          return (
            <div key={member.id} className='member-profile'>
              {imageIds && imageIds[index] == null ? (<img
                className='member-img'
                src={person}
                alt='generic person'
              />) : (<Image
                key={index}
                cloudName='dii2emagu'
                publicId={imageIds && imageIds.length > 0 ? imageIds[index] : imageIds}
                className='member-img'
              />)}
              <p
                id='user-name'
                style={{
                  'backgroundColor': member.color,
                  'borderRadius': '12px',
                  'padding': '3px 12px',
                  'color': '#fff',
                }}
                className='text-centre'>{member.firstName} {member.lastName}</p>
            </div>
          )
        })}
      </div>
      <List title={"Today's Tasks"} id={'dash-today-list'} list={todaysTasks} refresh={onRefresh} />
      <div id='tasks-to-do'>
        <List title={"My Tasks"} id={'dash-my-list'} list={myTasks} refresh={onRefresh} />
        <List title={"Assigned Tasks"} id={'dash-assigned-list'} list={assignedTasks} refresh={onRefresh} />
      </div>
      <List title={"Coming up this month"} id={'dash-month-list'} list={monthTasks} refresh={onRefresh} />
      <div id='tasks-col-4' >
        <List title={"Over Due"} id={'dash-overdue-list'} list={overdueTasks} refresh={onRefresh} />
        <List title={"Completed"} id={'dash-complete-list'} list={completedTasks} refresh={onRefresh} />
      </div>
      { modalOpen && <Modal closeModal={handleCloseModal} ><LeaveHousehold match={match} /></Modal>}
    </div>
  );
};

export default DashHome;