// packages
import { useContext, useEffect } from 'react';

// context
import LocationContext from "../context/LocationContext";


const useSiteLocation = (location) => {

  // console.log(location);
  const { handleSiteLocation } = useContext(LocationContext);

  useEffect(() => {
      handleSiteLocation(location.pathname);
  }, [handleSiteLocation, location.pathname]);

}

export default useSiteLocation;