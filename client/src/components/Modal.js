// packages
import React, { useEffect, useContext, Component, useRef } from 'react';

// styles
import './Modal.css';

// context
import MediaContext from '../context/MediaContext';


const Modal = ({closeModal, children}) => {

  const div = useRef(null);

  const { isMobileDevice, isSmallScreen, isTabletDevice, isDesktopDevice, isLargeScreen } = useContext(MediaContext);
  
  // console.log('window.current.scrollHeight =', Component.current.scrollHeight);
  useEffect(() => {
    // stop the page below scrolling - realise this is not the "React way". 
    
    // STEVE!, if this is an issue, refer to ANDY.
    if( isTabletDevice || isDesktopDevice || isLargeScreen ){
      
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }
    
    if( div.current && (isMobileDevice || isSmallScreen) ){
      console.log('element.current =', div.current.offsetHeight);
      document.body.style.maxHeight = div.current.offsetHeight;
      // document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }

  }, [div, isTabletDevice, isDesktopDevice, isLargeScreen]);

  
  return (
    <div id='overlay' ref={div}>
      <div id='modal-content'>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;