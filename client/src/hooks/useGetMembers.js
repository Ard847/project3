// packages
import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const useGetMembers = () => {

  const [ members, setMembers ] = useState([]);

  const fetchData = async () => {
    const houseID = getSession('houseID');
    const url = `/api/user/getusers/${houseID}`;
    const userResponse = await fetcher( url, 'GET'); 
    // console.log('userResponse =', userResponse);
    setMembers(userResponse);
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    }; 

  }, []);

  return members;
}

export default useGetMembers;