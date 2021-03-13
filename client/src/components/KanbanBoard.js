// packages
import React from 'react'

// styles
import './Kanban.css';

const KanbanBoard = ({title}) => {

  console.log('KanbanList title =', title); 

  return(
    <div className='kanban-list-container'>
      <h5 className='kanban-title'>{title}</h5>
    </div>
  )

}

export default KanbanBoard;