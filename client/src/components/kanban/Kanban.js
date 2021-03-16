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
import { jobs } from './data';


const Kanban = () => {

  // const [ items, setItems ] = useState({});
  const [tasks, setTasks] = useState(jobs);

  // console.log({tasks});

  const moveCard = useCallback(
    (item, channel) => {
      
      // console.log('item =', item);
      let task = tasks.find(task => task.id === item.id);
      const taskIndex = tasks.indexOf(task);
      // console.log('channel =', channel);      
      let newTasks = [...tasks];
      // console.log('newTasks[taskIndex].channel =', newTasks[taskIndex].channel );
      newTasks[taskIndex].channel = channel;
      // console.log('newTasks =', newTasks);
      setTasks(newTasks);
    },
    [tasks]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div id='kanban-board-container'>
        {/* <h3>Kanban</h3> */}
        <KanbanBoard title={'Tasks to do'} channel={'to-do'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.channel === 'to-do';
            })
            .map((task) => {
              // console.log('task =', task);
              return <Card key={task.id} data={task} />
            })}
        </KanbanBoard>

        <KanbanBoard title={'Assigned'} channel={'assigned'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.channel === 'assigned';
            })
            .map((task) => {
              // console.log('task =', task);
              return <Card key={task.id} data={task} />
            })}
        </KanbanBoard>

        <KanbanBoard title={'Complete'} channel={'complete'} moveCard={moveCard} >
          {tasks
            .filter((task) => {
              return task.channel === 'complete';
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