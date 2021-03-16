// packages
import React from 'react';

// styles
import './Modal.css';

// components
import CreateTaskForm from '../components/forms/CreateTaskForm';

const Modal = ({closeModal}) => {
  
  return (
    <div id='overlay'>
      <div id='modal-content'>
        <button onClick={closeModal}>Close</button>
        <CreateTaskForm />
      </div>
    </div>
  )
}

export default Modal;