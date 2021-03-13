// packages
import React from 'react'

// styles
import './Kanban.css';

// components
import KanbanBoard from './KanbanBoard'; 


const Kanban = () => {
  return(
    <div id='kanban-board-container'>
    {/* <h3>Kanban</h3> */}
      <KanbanBoard title={'Tasks to do'} />
      <KanbanBoard title={'Assigned'} />
      <KanbanBoard title={'Complete'} />
    </div>
  )
}

export default Kanban; 