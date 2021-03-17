// packages
import React from 'react';

// styles
import './Modal.css';


const Modal = ({closeModal, children}) => {
  
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