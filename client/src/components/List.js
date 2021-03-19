// packages
import React from 'react';

// styles
import './List.css';

const List = ({ title, id, list }) => {

  // console.log('list, list =', list);
  return (
    <div id={id} className='list-container'>
      <h5 className='list-title'>{title}</h5>
      {list.map((task) => {
        return (<p key={task.id}>{task.taskName}</p>);
      })}
    </div>
  )
}

export default List;