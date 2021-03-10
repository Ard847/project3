// packages
import { useState, createContext, useEffect } from 'react';

// functions
import removeFromSession from '../functions/removeFromSession';
import getSession from '../functions/getSession'; 

// create context 
const LoggedInContext = createContext();


const LoggedInContextProvider = ({children}) => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    const isLoggedIn = getSession('id');
    console.log('isLoggedIn =', isLoggedIn);
    
    if (isLoggedIn){
      setLoggedIn(true);
    }
  }, [loggedIn])


  const userLoggedIn = async (username, password) => {
    setLoggedIn(true);
  }

  const userLoggedOut = async (username, password) => {
    setLoggedIn(false);
    removeFromSession('id');
  }

  console.log('LoggedInContext loggedIn =', loggedIn);
  return (
    <LoggedInContext.Provider value={{ loggedIn, userLoggedIn, userLoggedOut }}>
      {children}
    </LoggedInContext.Provider>
  )
}

export default LoggedInContext;
export { LoggedInContextProvider };