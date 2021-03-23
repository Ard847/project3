// packages
import React, { useEffect } from 'react';

// styles
import './Modal.css';


const Modal = ({closeModal, children}) => {

  useEffect(() => {
    // stop the page below scrolling - realise this is not the "React way". 

    // STEVE!, if this is an issue, refer to ANDY.
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    }

  }, []);
  
  return (
    <div id='overlay'>
      <div id='modal-content'>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;