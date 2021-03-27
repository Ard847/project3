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
  const [userImage,setUserImage] = useState(true);
  const [imageChange,setChangeImage] = useState(false);
  // const [ houseID , setHouseID ] = useState('');
  const { loggedIn } = useContext(LoggedInContext);
  const houseID = getSession('houseID');
  // console.log('houseID', houseID);

  const fetchData = useCallback(async () => {

    if (houseID !== null) {
      let token = getSession('token').split('"');
      token = token[1];

      const url = `/api/user/getusers/${houseID}`;
      const userResponse = await fetcher(url, 'GET', '', token);
      // console.log(`userResponse called =`, userResponse);
      if (userResponse.message === 'success') {
        setMembers(userResponse.members);

      } else {
        setMembers([]);
      }
    }

  }, [houseID]);



  const refreshMembers = () => {
    // console.log('refreshing');
    fetchData();
  }

  useEffect(() => {
    if(loggedIn){
      setTimeout(() => {window.location.reload() }, 3000);
    }
   
  }, [userImage]);

  useEffect(() => {
    fetchData();
    
    return () => {
      //console.log(`I did unmount`);
    };

  },[fetchData]);

  
  // console.log('membersContext members =', members);

  return (
    <MembersContext.Provider value={{ members, refreshMembers, userImage, setUserImage/* , refresh */ }}>
      {children}
    </MembersContext.Provider>
  )
}

export default MembersContext;
export { MembersContextProvider };