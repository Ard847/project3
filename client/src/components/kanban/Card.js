// packages
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const Card = ({data}) => {

  // console.log('ItemTypes =', ItemTypes);
  const id = data.id;

  const [{ isDragging }, drag ] = useDrag(() => ({
    item: {type: ItemTypes.CARD, id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropEffect = monitor.getDropResult();
      // console.log("just dropped item", item);
      // console.log("dropEffect", dropEffect);
    },
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