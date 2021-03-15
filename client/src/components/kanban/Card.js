// packages
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const Card = ({data}) => {

  // console.log('ItemTypes =', ItemTypes);
  console.log('data =', data);

  const [{ isDragging }, drag, dragPreview ] = useDrag(() => ({
    item: {type: ItemTypes.CARD,},
    collect: (monitor, props) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  return (
    <div 
      className='card'
      ref={drag}
      style={{
        backgroundColor: isDragging ? 'var(--yellow)' : 'white',
      }}
    >
      <p>{data.name}</p>
    </div>
  )
}

export default Card;