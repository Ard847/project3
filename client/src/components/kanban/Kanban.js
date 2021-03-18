// packages
import React, { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// styles
import './Kanban.css';

// components
import KanbanBoard from './KanbanBoard';
import Card from './Card';
import Modal from '../../components/Modal';
import EditTask from '../../components/EditTask';
import Clock from '../../components/Clock';

// hooks
import useGetTasks from '../../hooks/useGetTasks';
import useGetMembers from '../../hooks/useGetMembers';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';


const Kanban = () => {

  const [tasks, refreshTasks] = useGetTasks();

  // const [ message , setMessage ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedTask , setSelectedTask ] = useState({});
  // console.log('tasks =', tasks);

  const members = useGetMembers();
  // console.log('members =', members);
      
  const handleToggelModal = (task) => {
    // console.log('task =', task);
    setSelectedTask(task);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

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
        const getDate = new Date().toLocaleDateString();
        const formatDate = getDate.replaceAll("/", "-").split('-').reverse().join('-');
        
        const dateURL = `/api/task/updateCompletedDate/${houseID}`
        const date = {
          taskID: item.id,
          completedDate: formatDate,
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

  const sortCard = useCallback(async (dragIndex, hoverIndex) => {
    // if (dragIndex && hoverIndex) {
    //   console.log('dragIndex =', dragIndex);
    //   console.log('hoverIndex =', hoverIndex);
    //   console.log('tasks =', tasks);
      // const dragCard = tasks.find(task => task.id === dragIndex);
      // console.log('dragCard =', dragCard);
    // };

  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id='kanban-content'>
      <Clock day={true} time={false} />
        {/* {message ? <h6>You must assign a member in the task editor first</h6> : <h6></h6>} */}
        <div id='kanban-board-container'>
          <KanbanBoard title={'Tasks to do'} status={'to-do'} moveCard={moveCard} >
            {tasks
              .filter((task) => {
                return task.status === 'to-do';
              })
              .map((task, index) => {
                // console.log('task =', task);
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} member={user.firstName} sortCard={sortCard} toggelModal={handleToggelModal} />
                  } else {
                    return <Card key={task.id} data={task} index={index} sortCard={sortCard} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>

          <KanbanBoard title={'Assigned'} status={'assigned'} moveCard={moveCard} >
            {tasks
              .filter((task) => {
                return task.status === 'assigned';
              })
              .map((task, index) => {
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} member={user.firstName} sortCard={sortCard} toggelModal={handleToggelModal}/>
                  } else {
                    return <Card key={task.id} data={task} index={index} sortCard={sortCard} toggelModal={handleToggelModal}/>
                  }
                }
                return null;
              })}
          </KanbanBoard>

          <KanbanBoard title={'Complete'} status={'complete'} moveCard={moveCard} >
            {tasks
              .filter((task) => {
                return task.status === 'complete';
              })
              .map((task, index) => {
                if (members.length !== 0) {
                  let user = members.find(member => member.id === task.userID)
                  if (user) {
                    return <Card key={task.id} data={task} index={index} member={user} sortCard={sortCard} toggelModal={handleToggelModal}/>
                  } else {
                    return <Card key={task.id} data={task} index={index} sortCard={sortCard} toggelModal={handleToggelModal}/>
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