// packages
import React, { useState } from 'react';

// styles
import './DashTasks.css';

// components
import Kanban from '../../components/Kanban';


const DashTasks =() => {

  const [ view , setView ] = useState('views');

  const changeView = (event) => {
    // console.log('event.target.value =', event.target.value);
    setView(event.target.value);
  }

  return (
   <div id='dash-tasks-content'>
     <div className='dash-title' >
        <h2>Tasks</h2>
        <select name='views' id='tasks-views' onChange={changeView}>
          <option value='views'>Views</option>
          <option value='kanban'>Kanban</option>
        </select>
      </div>
      {(view === 'kanban')  && <Kanban />}
   </div>
  )
}

export default DashTasks; 