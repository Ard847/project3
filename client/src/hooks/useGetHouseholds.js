import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';


const useGetHouseholds = () => {

  const [ households , setHouseholds ] = useState([]);
  
  const fetchData = async () => {
    const id = getSession('id');
    const url = `/api/household/gethousehold/${id}`;
    const householdResponse = await fetcher(url, 'GET');
    
    // console.log('householdResponse =', householdResponse);
    setHouseholds(householdResponse);
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    }; 
    
  }, []);

  return households; 
}

export default useGetHouseholds;