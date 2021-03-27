// packages
import { useState, createContext, useEffect, useCallback } from 'react';

// functions
import getSession from '../functions/getSession';
import fetcher from '../functions/fetcher';

// create context 
const MembersContext = createContext();

const MembersContextProvider = ({ children }) => {

  const houseID = getSession('houseID');
  const [members, setMembers] = useState([]);
  const [ houseState , setHouseState ] = useState(houseID);
  // console.log('houseID', houseID);

  const fetchData = useCallback(async () => {

    // if (houseID !== null) {
      let token = getSession('token').split('"');
      token = token[1];

      const url = `/api/user/getusers/${houseState}`;
      const userResponse = await fetcher(url, 'GET', '', token);
      // console.log(`userResponse called =`, userResponse);
      if (userResponse.message === 'success') {
        setMembers(userResponse.members);
      } else {
        setMembers([]);
      }
    // }
  }, [houseState]);


  const refreshMembers = () => {
    // console.log('refreshing');
    fetchData();
  }

  const handleHouseID = (id) => {
    setHouseState(id);
  }


  useEffect(() => {
    if(houseID !== null){
      fetchData();
      return () => {
        //console.log(`I did unmount`);
      };
    }
  },[fetchData, houseID]);

  // console.log('membersContext members =', members);

  return (
    <MembersContext.Provider value={{ members, refreshMembers, handleHouseID }}>
      {children}
    </MembersContext.Provider>
  )
}

export default MembersContext;
export { MembersContextProvider };