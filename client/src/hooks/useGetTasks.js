// packages
import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const useGetTasks = () => {

  const [ tasks , setTasks ] = useState([]);

  const fetchData = async () => {
    const houseID = getSession('houseID');
    let token = getSession('token').split('"');
    token = token[1];
    const url = `/api/task/getTasks/${houseID}`;
    const tasksResponse = await fetcher(url, 'GET', '',token );
    // console.log('tasksResponse =', tasksResponse);
    setTasks(tasksResponse.data);
  }

  const refreshTasks = (taskID, newStatus) => {
    console.log('refreshing');
    // change the tasks array manually. - optimistic loading
    // console.log({taskID});
    // console.log({newStatus});
    if(taskID && newStatus){
      setTasks(tasks => {
        let task = tasks.find(task => task.id === taskID); 
        const taskIndex = tasks.indexOf(task);
        const newTasks =[...tasks];
        newTasks[taskIndex].status = newStatus;
        return newTasks;
      });
    }
    fetchData();
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    }; 
    
  }, []);

  return [tasks, refreshTasks];
}

export default useGetTasks;