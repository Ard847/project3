// packages
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// styles
import './Kanban.css';

// context
import TaskContext from '../../context/TaskContext';

// components
import KanbanBoard from './KanbanBoard';
import Card from './Card';
import Modal from '../Modal';
import EditTask from '../EditTask';
import Clock from '../Clock';

// hooks
// import useGetTasks from '../../hooks/useGetTasks';
import useGetMembers from '../../hooks/useGetMembers';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';


const Kanban = () => {

  const { tasks, refreshTasks } = useContext(TaskContext);
  // console.log('tasks =', tasks);

  // const [ message , setMessage ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedTask , setSelectedTask ] = useState({});
  const [ filteredTasks, setFilteredTasks ] = useState([]);
  const [ completedTasks, setCompletedTasks ] = useState([]);

  const members = useGetMembers('kanban');
  // console.log('members =', members);

  useEffect(() => {
    let filteredData = [];
    let completedData = [];
    if (tasks.length > 0){

      tasks.forEach(task => {
        
        const todaysDate = new Date();
        // console.log('task kanban =', task);
        // task range
        const startDate = new Date(task.nextDate);
        startDate.setDate(startDate.getDate() - Number(task.alertBefore));
        
        const endDate = new Date(task.nextDate);
        endDate.setDate(endDate.getDate() + Number(task.completeBy));
        const completedDate = new Date(task.completedDate);
        // console.log('todaysDate =', todaysDate);
        // console.log('startDate =', startDate);
        // console.log('endDate =', endDate);

        if( (startDate <= todaysDate && todaysDate <= endDate) || todaysDate > endDate ){
          // console.log('dates between');
          filteredData.push(task);
        }

        if( completedDate <= todaysDate && task.status === 'complete'){
          completedData.push(task);
        }

      });
      setFilteredTasks(filteredData);
      setCompletedTasks(completedData);
    }
  }, [tasks]);

  


  // call modal --------------------------------------------------------------
  const handleToggelModal = (task) => {
    // console.log('task =', task);
    setSelectedTask(task);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  // drag and drop -----------------------------------------------------------
  const moveCard = useCallback(async (item, newStatus) => {
    // console.log('item =', item);
    // console.log('newStatus =', newStatus); 
    if (item && newStatus) {

      let token = getSession('token').split('"');
      token = token[1];
      const houseID = getSession('houseID');

      if (item.data.userID === null && newStatus === 'assigned'){
          // setMessage(true);
          // setTimeout(() => {
          //   setMessage(false)
          // }, 2000);
        return;
      }

      if (item.data.userID !== null && newStatus === 'to-do'){
        const userURL = `/api/task/updateUser/${houseID}`;
        const user = {
          taskID: item.id,
          user: null,
        };
        // const updateUserResponse = 
        await fetcher(userURL, 'PUT', user, token);
        // console.log('updateUserResponse, kanban.js =', updateUserResponse);
      }

      if(newStatus === 'complete'){
        const getDate = new Date();
        
        const dateURL = `/api/task/updateCompletedDate/${houseID}`;
        const date = {
          taskID: item.id,
          completedDate: getDate,
        };
        const updateCompletedDateResponse = await fetcher(dateURL, 'PUT', date, token);
        console.log('updateCompletedDateResponse =', updateCompletedDateResponse);
      }

      const url = `/api/task/updateStatus/${houseID}`
      const body = {
        taskID: item.id,
        newStatus: newStatus,
      };
      const updateStatusResponse = await fetcher(url, 'PUT', body, token);
      // console.log('updateResponse =', updateResponse);

      if (updateStatusResponse.message === 'success') {
        refreshTasks(item.id, newStatus);
      }
    }

  }, [refreshTasks]);

  

  // rendered ----------------------------------------------------------------
  return (
    <DndProvider backend={HTML5Backend}>
      <div id='kanban-content'>
      <Clock day={true} time={false} />
        {/* {message ? <h6>You must assign a member in the task editor first</h6> : <h6></h6>} */}
        <div id='kanban-board-container'>
          <KanbanBoard title={'Tasks to do'} status={'to-do'} moveCard={moveCard} >
            {filteredTasks
              .filter((task) => {
                return task.status === 'to-do';
              })
              .map((task, index) => {
                // console.log('task =', task);
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal} member={user.firstName} />
                  } else {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>

          <KanbanBoard title={'Assigned'} status={'assigned'} moveCard={moveCard} >
            {filteredTasks
              .filter((task) => {
                return task.status === 'assigned';
              })
              .map((task, index) => {
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal} member={user.firstName} />
                  } else {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>

          <KanbanBoard title={'In Progress'} status={'progress'} moveCard={moveCard} >
            {filteredTasks
              .filter((task) => {
                return task.status === 'progress';
              })
              .map((task, index) => {
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal} member={user.firstName} />
                  } else {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>

          <KanbanBoard title={'Complete'} status={'complete'} moveCard={moveCard} >
            {completedTasks
              .map((task, index) => {
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal} member={user.firstName} />
                  } else {
                    return <Card key={task.id} data={task} index={index} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>
        </div>
        { modalOpen && <Modal closeModal={handleCloseModal} ><EditTask task={selectedTask} refresh={() => refreshTasks()} /></Modal> }
      </div>
    </DndProvider>
  )
}

export default Kanban;