// packages
import { useState, createContext, useEffect, useContext, useCallback } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

// context
import LoggedInContext from './LoggedInContext';

// create context 
const MembersContext = createContext();


const MembersContextProvider = ({children}) => {

  const [ members, setMembers] = useState([]);
  const { loggedIn } = useContext(LoggedInContext);
  
  const fetchData = useCallback(async () => {
      if(loggedIn){
        const houseID = getSession('houseID');
        let token = getSession('token').split('"');
        token = token[1];
    
        const url = `/api/user/getusers/${houseID}`;
        const userResponse = await fetcher( url, 'GET','',token); 
        // console.log(`userResponse called from ${here}=`, userResponse);
        setMembers(userResponse);
    }
  }, [loggedIn]);

  const refreshMembers = () => {
    fetchData();
  }

  useEffect(() => {

    fetchData();
    return () => {
      console.log('I did unmount');
    };

  }, [fetchData]);

  return (
    <MembersContext.Provider value={{ members, refreshMembers }}>
      {children}
    </MembersContext.Provider>
  )
}

export default MembersContext;
export { MembersContextProvider };