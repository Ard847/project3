// packages
import { useState, createContext, useEffect, useContext, useCallback } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';
// context
import LoggedInContext from './LoggedInContext';

// create context 
const MembersContext = createContext();


const MembersContextProvider = ({ children }) => {

  const [members, setMembers] = useState([]);
  const { loggedIn } = useContext(LoggedInContext);
  const [userImage,setUserImage] = useState(true);
  const [imageChange,setChangeImage] = useState(false);

  const fetchData = useCallback(async () => {
    if (loggedIn) {
      const houseID = getSession('houseID');
      let token = getSession('token').split('"');
      token = token[1];

      const url = `/api/user/getusers/${houseID}`;
      const userResponse = await fetcher(url, 'GET', '', token);
      // console.log(`userResponse called =`, userResponse);
       
      setMembers(userResponse);
    }

  }, [loggedIn]);



  const refreshMembers = () => {
    // console.log('refreshing');
    fetchData();
  }

  useEffect(() => {
    if(loggedIn){
      setTimeout(() => {window.location.reload() }, 3000);
    }
   
  }, [userImage]);

  return (
    <MembersContext.Provider value={{ members, refreshMembers, userImage, setUserImage/* , refresh */ }}>
      {children}
    </MembersContext.Provider>
  )
}

export default MembersContext;
export { MembersContextProvider };