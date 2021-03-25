// packages
import { createContext } from 'react';
import { useMediaQuery } from 'react-responsive';


// create context 
const MediaContext = createContext();


const MediaContextProvider = ({children}) => {

  const isMobileDevice = useMediaQuery({ query: '(max-width: 576px)' });
  const isSmallScreen = useMediaQuery({ query: '(min-width: 576px) and (max-width: 760px)' });
  const isTabletDevice = useMediaQuery({ query: '(min-width: 760px) and (max-width: 992px)' });
  const isDesktopDevice = useMediaQuery({ query: '(min-width: 992px) and (max-width: 1200px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px) ' });

  return (
    <MediaContext.Provider value={{ isMobileDevice, isSmallScreen, isTabletDevice, isDesktopDevice, isLargeScreen }}>
      {children}
    </MediaContext.Provider>
  )
}

export default MediaContext;
export { MediaContextProvider };

  