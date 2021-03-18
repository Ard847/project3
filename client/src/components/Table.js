// packages
import React, { useState } from 'react';

// styles
import './Table.css';

// components
import Modal from '../components/Modal';
import EditTask from '../components/EditTask';
import Clock from '../components/Clock';

// hooks
import useGetTasks from '../hooks/useGetTasks';
import useGetMembers from '../hooks/useGetMembers';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const Table = () => {

  const members = useGetMembers();
  console.log('members =', members);

  const [tasks, refreshTasks] = useGetTasks();
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedTask , setSelectedTask ] = useState({});

  console.log('tasks =', tasks);

  const toggelModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const getUser = (userID) => {
    if (userID !== null) {
      const user = members.find(member => member.id === userID);
      const userName = `${user.firstName} ${user.lastName}`;
      return userName;
    } else { 
      return ''; 
    }
  }

  const formatDate = (date) => {
    if(date !== ""){
      const newDate = new Date(date).toDateString();
      return newDate;
    } else { 
      return ''; 
    }
  }

  const deleteTask = (task) => {

  }

  return (
    <div id='table-content'>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Duration</th>
            <th>Next Date</th>
            <th>Alert</th>
            <th>Complete By</th>
            <th>Repeat</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Last Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id} onClick={() => {toggelModal(task)}}>
                <td>{task.taskName}</td>
                <td>{task.duration} mins</td>
                <td>{formatDate(task.nextDate)}</td>
                <td>{task.alertBefore} days before</td>
                <td>{task.completeBy} days after</td>
                <td>Every {task.repeatEvery} days</td>
                <td>{getUser(task.userID)}</td>
                <td>{task.status}</td>
                <td>{formatDate(task.completedDate)}</td>
                <td><button className='delete-btn' onClick={() => {deleteTask(task)}} >Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      { modalOpen && <Modal closeModal={handleCloseModal} ><EditTask task={selectedTask} refresh={() => refreshTasks()} /></Modal> }
      
    </div>
  )
}

export default Table;