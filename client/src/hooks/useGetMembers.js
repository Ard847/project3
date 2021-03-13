// packages
import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const useGetMembers = () => {

  const [ members, setMembers ] = useState([]);

  const fetchData = async () => {
    const houseID = getSession('houseID');
    let token = getSession('token').split('"')
    token = token[1]
    const url = `/api/user/getusers/${houseID}`;
    const userResponse = await fetcher( url, 'GET','',token); 
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