// packages
import { useEffect, useState } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

const useGetMembers = (calledFrom) => {

  const [ members, setMembers ] = useState([]);

  const fetchData = async () => {
    const houseID = getSession('houseID');
    let token = getSession('token').split('"');
    token = token[1];

    const url = `/api/user/getusers/${houseID}`;
    const userResponse = await fetcher( url, 'GET','',token); 
    // console.log(`userResponse called from ${here}=`, userResponse);
    setMembers(userResponse);
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log(`I did unmount at ${calledFrom}`);
    }; 

  }, [calledFrom]);

  // console.log(`hook ${here} members =`, members);

  return members;
}

export default useGetMembers;