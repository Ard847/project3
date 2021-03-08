// packages
import { useState, createContext } from 'react';

// create context 
const LoggedInContext = createContext();


const LoggedInContextProvider = ({children}) => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  const userLoggedIn = async (username, password) => {
    setLoggedIn(true);
  }

  const userLoggedOut = async (username, password) => {
    setLoggedIn(false);
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