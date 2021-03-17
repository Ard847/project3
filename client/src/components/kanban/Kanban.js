// packages
import React, { useState, useCallback, useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// styles
import './Kanban.css';

// components
import KanbanBoard from './KanbanBoard';
import Card from './Card';

// data
// import { jobs } from './data';

// hooks
import useGetTasks from '../../hooks/useGetTasks';

// functions
import getSession from '../../functions/getSession';
import fetcher from '../../functions/fetcher';


const Kanban = () => {

  // const [tasks, setTasks] = useState([]);
  // console.log({tasks});
  
  const [tasks, refreshTasks ] = useGetTasks();
  
  const moveCard = useCallback(
    async (item, newStatus) => {
      console.log('item =', item);
      console.log('newStatus =', newStatus); 

      let token = getSession('token').split('"');
      token = token[1];
      const houseID = getSession('houseID');

      const url = `/api/task/updateStatus/${houseID}`
      const body = {
        taskID: item.id,
        newStatus: newStatus,
      }
      const updateResponse = await fetcher(url, 'PUT', body, token);
      console.log('updateResponse =', updateResponse);

      if(updateResponse.message === 'success'){
        // console.log('its in the block');
        
        refreshTasks(item.id, newStatus);
      }
      
    },
    [tasks]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div id='kanban-board-container'>
        {/* <h3>Kanban</h3> */}
        <KanbanBoard title={'Tasks to do'} status={'to-do'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.status === 'to-do';
            })
            .map((task) => {
              // console.log('task =', task);
              return <Card key={task.id} data={task} />
            })}
        </KanbanBoard>

        <KanbanBoard title={'Assigned'} status={'assigned'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.status === 'assigned';
            })
            .map((task) => {
              // console.log('task =', task);
              return <Card key={task.id} data={task} />
            })}
        </KanbanBoard>

        <KanbanBoard title={'Complete'} status={'complete'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.status === 'complete';
            })
            .map((task) => {
              // console.log('task =', task);
              return <Card key={task.id} data={task} />
            })}
        </KanbanBoard>
      </div>
    </DndProvider>
  )
}

export default Kanban;