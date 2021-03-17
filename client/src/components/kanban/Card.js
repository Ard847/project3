// packages
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';


const Card = ({ data, member, index, sortCard, toggelModal }) => {

  const id = data.id;
  const ref = useRef(null);
  
  const onToggelModal = (event) => {
    toggelModal(data);
  }

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      // console.log('hover item =', item );
      // console.log('hover monitor =', monitor);
      const dragIndex = item.id;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      // Time to actually perform the action
      sortCard(dragIndex, hoverIndex);
      // see code reference at bottom of document. React-DnD. 
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({

    item: { type: ItemTypes.CARD, id, data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // end: (item, monitor) => {
    //   const dropEffect = monitor.getDropResult();
    //   // console.log("just dropped item", item);
    //   // console.log("dropEffect", dropEffect);
    // },
  }));

  drag(drop(ref));

  return (
    <div
      className='card'
      ref={ref}
      style={{
        backgroundColor: isDragging ? 'var(--yellow)' : 'white',
      }}
      onClick={onToggelModal}
    >
      <p>{data.taskName}</p>
      <p className='sml-text'><strong>Time it takes: </strong>{data.duration} mins</p>
      { member && <p className='sml-text'><strong>Assigned to: </strong>{member}</p>}
    </div>
  )
}

export default Card;

// REFERENCES
// React-DnD. (2021). Examples, sortable, simple. React-DnD. https://react-dnd.github.io/react-dnd/examples/sortable/simple. accessed: 17.03.2021