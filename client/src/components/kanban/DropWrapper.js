// pacakges
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants'; 

const DropWrapper = ({ onDrop, children, status}) => {

  const [{ isOver }, drop] = useDrop({
    accept : ItemTypes.CARD,
    canDrop: (item, monitor) => {
      
    },
    drop: (item, monitor) => {
      onDrop(item , monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      {React.cloneElement( children, { isOver })}
    </div>
  );

}

export default DropWrapper;