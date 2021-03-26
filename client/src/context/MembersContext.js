// packages
import { useState, createContext, useEffect, useCallback } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

// create context 
const MembersContext = createContext();


const MembersContextProvider = ({children}) => {

  const [ members, setMembers ] = useState([]);

  const fetchData = useCallback( async () => {
    const houseID = getSession('houseID');
    let token = getSession('token').split('"');
    token = token[1];

    const url = `/api/user/getusers/${houseID}`;
    const userResponse = await fetcher( url, 'GET','',token); 
    console.log(`userResponse called =`, userResponse);
    setMembers([]);
    setMembers(userResponse);
  });

  const refreshMembers = () => {
    console.log('refreshing');
    fetchData();
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log(`I did unmount`);
    }; 

  }, []);

  return (
    <MembersContext.Provider value={{ members, refreshMembers }}>
      {children}
    </MembersContext.Provider>
  )
}

export default MembersContext;
export { MembersContextProvider };