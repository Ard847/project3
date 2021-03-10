import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';

const useGetHouseholds = () => {

  const [ households , setHouseholds ] = useState([]);
  
  const fetchData = async () => {
    const id = getSession('id');
    const url = `/api/household/gethousehold/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setHouseholds(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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