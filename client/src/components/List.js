// packages
import React, { useState } from 'react';


// styles
import './List.css';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const List = ({ title, id, list, refresh }) => {

  // console.log('list =', list);
  const houseID = parseInt(getSession('houseID'));
  let token = getSession('token').split('"');
  token = token[1];


  const toggelTaskComplete = async (taskID, taskName, checked) => {

    if (checked) {
      console.log(`${taskName} is complete`);

      const getDate = new Date().toLocaleDateString();
      const formatDate = getDate.replaceAll("/", "-").split('-').reverse().join('-');

      const dateURL = `/api/task/updateCompletedDate/${houseID}`;
      const date = {
        taskID: taskID,
        completedDate: formatDate,
      };
      const updateCompletedDateResponse = await fetcher(dateURL, 'PUT', date, token);
      console.log('updateCompletedDateResponse =', updateCompletedDateResponse);
      if (updateCompletedDateResponse.message) {
        const url = `/api/task/updateStatus/${houseID}`
        const body = {
          taskID: taskID,
          newStatus: 'complete',
        };
        const updateStatusResponse = await fetcher(url, 'PUT', body, token);
        console.log('updateStatusResponse =', updateStatusResponse);
        if (updateStatusResponse.message === 'success') {
          refresh(taskID, 'complete');
        }
      }

    } else {
      console.log(`${taskName} has unchecked`);
    }
  }

  // console.log('list, list =', list);
  return (
    <div id={id} className='list-container'>
      <h5 className='list-title'>{title}</h5>
      {list.map((task) => {
        return (
          <div key={task.id}>
            <p>{task.taskName}</p>
            {
              task.status === 'complete'
                ? <input type='checkbox' onClick={() => false} checked readOnly/>
                : <input type='checkbox' onChange={() => toggelTaskComplete(task.id, task.taskName, true)} />
            }
          </div>
        );
      })}
    </div>
  )
}

export default List;