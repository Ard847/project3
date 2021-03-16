// packages
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const KanbanBoard = ({title, channel, moveCard, children}) => {

  // console.log('KanbanList title =', title); 
  // console.log('KanbanList children =', children); 
  // console.log('KanbanList channel =', channel); 

    
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item, channel),
    // props to collect
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return(
    <div 
      className={`kanban-list-container`}
      ref={drop}
      style={{backgroundColor: isOver ? 'red' : 'var(--white)' }}
    >
      <h5 className='kanban-title'>{title}</h5>
      { isOver ? 'release to drop' : 'drag a box here' }
      {children}
    </div>
  )

}

export default KanbanBoard;