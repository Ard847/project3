// packages
import React from 'react';
// styles
import './Modal.css';


const Modal = ({closeModal, children}) => {

  const windowHeight = document.body.offsetHeight;
  // console.log('windowHeight =', windowHeight);
    
  return (
    <div id='overlay' style={{ 'height' : windowHeight}}>
      <div id='modal-content'>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  )

}

export default Modal;