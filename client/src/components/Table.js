// packages
import React, { useEffect, useState } from 'react';

// styles
import './Table.css';

// components
import Modal from '../components/Modal';
import EditTask from '../components/EditTask';

// hooks
import useGetTasks from '../hooks/useGetTasks';
import useGetMembers from '../hooks/useGetMembers';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';
import getPriority from '../functions/getPriority';


const Table = () => {

  // hooks
  const members = useGetMembers();
  const [tasks, refreshTasks] = useGetTasks();
  // console.log('tasks =', tasks);

  // variables
  const houseID = getSession('houseID');
  let token = getSession('token').split('"');
  token = token[1];
  // console.log('members =', members);

  // state
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ selectedTask , setSelectedTask ] = useState({});
  const [ sortedTasks, setSortedTasks ] = useState([]);


  useEffect(() => {

    const sortedData = tasks.slice(0).sort(function (a, b) {
      return new Date(a.nextDate) - new Date(b.nextDate);
    });
    setSortedTasks(sortedData);

  }, [tasks]);

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
    if(date !== null){
      const newDate = new Date(date).toDateString();
      return newDate;
    } else { 
      return null; 
    }
  }

  const deleteTask = async (task) => {
    console.log('task to delete =', task);
    const url = `/api/task/deleteTask/${houseID}`;
    const body = {
      task: task,
    }
    const deleteResponse = await fetcher(url, 'DELETE', body, token);
    console.log('deleteResponse =', deleteResponse);
    if (deleteResponse.message === 'success'){
      refreshTasks();
    }

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
          {sortedTasks.map((task) => {
            return (
              <tr key={task.id} >
                <td onClick={() => {toggelModal(task)}}>{task.taskName}</td>
                <td onClick={() => {toggelModal(task)}}>{task.duration} mins</td>
                <td style={getPriority(task)} onClick={() => {toggelModal(task)}}>{formatDate(task.nextDate)}</td>
                <td onClick={() => {toggelModal(task)}}>{task.alertBefore} days before</td>
                <td onClick={() => {toggelModal(task)}}>{task.completeBy} days after</td>
                <td onClick={() => {toggelModal(task)}}>Every {task.repeatEvery} days</td>
                <td onClick={() => {toggelModal(task)}}>{getUser(task.userID)}</td>
                <td style={getPriority(task)} onClick={() => {toggelModal(task)}}>{task.status}</td>
                <td onClick={() => {toggelModal(task)}}>{formatDate(task.completedDate)}</td>
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