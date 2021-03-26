// packages
import React, { useContext, useEffect, useRef } from 'react';
// styles
import './Modal.css';
// Context
import MediaContext from '../context/MediaContext';


const Modal = ({ closeModal, children }) => {

  const div = useRef(null);

  // Full height, including the scroll part
  const fullHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  ) - 150;

  const windowHeight = document.body.clientHeight + 10;
  // console.log('windowHeight =', windowHeight);

  return (
    <div id='overlay' style={{ 'height': windowHeight }}  >
      <div ref={div} id='modal-content' style={{ 'height': fullHeight }}>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  )

}

export default Modal;