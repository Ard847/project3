// packages
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// styles
import './Kanban.css';

// components
import KanbanBoard from './KanbanBoard'; 
import Card from './Card';

// data
import { tasks } from './data';


const Kanban = () => {

  // const [ items, setItems ] = useState({});
  const [ index, setIndex ] = useState(1);

  const moveCard = (i) => {
    setIndex(i); 
  }

  return(
    <DndProvider backend={HTML5Backend}>
      <div id='kanban-board-container'>
      {/* <h3>Kanban</h3> */}
        <KanbanBoard title={'Tasks to do'} card={index === 1} moveCard={moveCard.bind(null, 1)}>
        
          { tasks.map((task) => {
            console.log('task =', task);
            return <Card key={task.id} data={task}/>
          })}

        </KanbanBoard>
        <KanbanBoard title={'Assigned'} card={index === 2} moveCard={moveCard.bind(null, 2)}/>
        <KanbanBoard title={'Complete'} card={index === 3} moveCard={moveCard.bind(null, 3)}/>
      </div>
    </DndProvider>
  )
}

export default Kanban; 