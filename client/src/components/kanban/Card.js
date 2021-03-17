// packages
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const Card = ({data, member}) => {

  // console.log({data});
  // console.log('ItemTypes =', ItemTypes);
  const id = data.id;
  
  const [{ isDragging }, drag ] = useDrag(() => ({
    item: {type: ItemTypes.CARD, id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // end: (item, monitor) => {
    //   const dropEffect = monitor.getDropResult();
    //   // console.log("just dropped item", item);
    //   // console.log("dropEffect", dropEffect);
    // },
  }));

    
  return (
    <div 
      className='card'
      ref={drag}
      style={{
        backgroundColor: isDragging ? 'var(--yellow)' : 'white',
      }}
    >
      <p>{data.taskName}</p>
      <p className='sml-text'><strong>Time it takes: </strong>{data.duration} mins</p>
      { data.userID && <p className='sml-text'><strong>Assigned to: </strong>{member}</p>}
    </div>
  )
}

export default Card;