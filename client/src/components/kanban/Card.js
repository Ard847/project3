// packages
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

// styles
import './Kanban.css';

// functions
import getPriority from '../../functions/getPriority';


const Card = ({ data, member, toggelModal, colour }) => {

  // console.log('member =', member);

  const id = data.id;
  const ref = useRef(null);

  const onToggelModal = () => {
    toggelModal(data);
  }

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
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
      { member &&
        <p className='sml-text'> <strong>Assigned to: </strong>
          <span
            style={{
              'backgroundColor': colour,
              'borderRadius': '5px',
              'padding': '3px 6px',
            }}
          > {member}
          </span>
        </p>
      }
      <p className='sml-text' style={getPriority(data)}>Due date: {data.nextDate}</p>
    </div>
  )
}

export default Card;

// REFERENCES
// React-DnD. (2021). Examples, sortable, simple. React-DnD. https://react-dnd.github.io/react-dnd/examples/sortable/simple. accessed: 17.03.2021