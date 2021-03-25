// packages
import React, { useState } from 'react';

// styles
import './DashTasks.css';

// components
import Kanban from '../../components/kanban/Kanban';
import Table from '../../components/Table';


const DashTasks = () => {

  const [ view , setView ] = useState('kanban');

  const changeView = (event) => {
    // console.log('event.target.value =', event.target.value);
    setView(event.target.value);
  }

  return (
   <div id='dash-tasks-content'>
     <div className='dash-title' >
        <h2>Tasks</h2>
        <select name='views' id='tasks-views' onChange={changeView}>
          <option value='kanban'>Kanban</option>
          <option value='all-tasks'>All Tasks</option>
        </select>
      </div>
      {(view === 'kanban')  && <Kanban />}
      {(view === 'all-tasks') && <Table />}
   </div>
  );
}

export default DashTasks; 