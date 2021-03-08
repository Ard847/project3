// packages
import { useState, createContext } from 'react';

// create context
const LocationContext = createContext();


const LocationContextProvider = ({children}) => {

  const [ siteLocation, setSiteLocation ] = useState('/');

  const handleSiteLocation = async (location) => {
    // console.log('Site Context, location =', location);
    setSiteLocation(location); 
  }

  return (
    <LocationContext.Provider value={{ siteLocation, handleSiteLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationContext;
export { LocationContextProvider };