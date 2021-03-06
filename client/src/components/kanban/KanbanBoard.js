// packages
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const KanbanBoard = ({title, status, moveCard, children}) => {
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item, status),
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
      style={{backgroundColor: isOver ? '#dfd5d5' : '#f9f6f6' }}
    >
      <h5 className='kanban-title'>{title}</h5>
      {children}
    </div>
  );

}

export default KanbanBoard;