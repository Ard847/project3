// packages
import { useState, createContext, useEffect, useContext, useCallback } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';
import checkTaskStatus from '../functions/checkTaskStaus';

// context
import LoggedInContext from './LoggedInContext';

// create context 
const TaskContext = createContext();


const TaskContextProvider = ({children}) => {

  const houseID = getSession('houseID');

  const [ tasks, setTasks] = useState([]);
  const [ houseState , setHouseState ] = useState(houseID);
  const { loggedIn } = useContext(LoggedInContext);
  
  const fetchData = useCallback(async () => {
      if(loggedIn ){
      let token = getSession('token').split('"');
      token = token[1];
      const url = `/api/task/getTasks/${houseState}`;
      const tasksResponse = await fetcher(url, 'GET', '', token);
      // console.log('tasksResponse =', tasksResponse.data);
      checkTaskStatus(tasksResponse.data);
      setTasks(tasksResponse.data);
    }
  }, [loggedIn, houseState ]);

  const refreshTasks = (taskID, newStatus) => {
    // console.log('refreshing');
    // change the tasks array manually. - optimistic loading
    // console.log({taskID});
    // console.log({newStatus});
    if (taskID && newStatus) {
      setTasks(tasks => {
        let task = tasks.find(task => task.id === taskID);
        const taskIndex = tasks.indexOf(task);
        const newTasks = [...tasks];
        newTasks[taskIndex].status = newStatus;
        return newTasks;
      });
    }
    fetchData();
  }

  const taskHouseID = (id) => {
    setHouseState(id);
  }

  // console.log('TaskContext tasks =', tasks);
  
  useEffect(() => {

    if(houseID !== null ){
      fetchData();
      return () => {
        //console.log('I did unmount');
      };
    }

  }, [houseID]);

  return (
    <TaskContext.Provider value={{ tasks, refreshTasks, taskHouseID }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext;
export { TaskContextProvider };