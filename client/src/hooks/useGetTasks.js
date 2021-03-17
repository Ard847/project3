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
    console.log('tasksResponse =', tasksResponse);
    setTasks(tasksResponse.data);
  }

  const refreshTasks = (taskID, newStatus) => {
    // change the tasks array manually.
    console.log({taskID});
    console.log({newStatus});
    setTasks(tasks => {
      console.log('tasks', tasks);
      const newTasks =[...tasks];
      return newTasks;
    });
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    }; 
    
  }, []);

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    }; 
    
  }, [tasks]);

  return [tasks, refreshTasks];
}

export default useGetTasks;