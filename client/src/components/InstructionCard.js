// packages
import React, { useState, useRef } from 'react';

// style
import './InstructionCard.css';


const InstructionCard = ({children, title, initialContent}) => {

  const content = useRef(null);
  // state
  const [activeState, setActiveState] = useState('');
  const [contentHeight, setContentHeight] = useState('');

  const toggelCollapse = () => {

    setActiveState(activeState === '' ? 'active' : '');
    // console.log(content.current.scrollHeight);

    // if setActive is equal to active. 
    // true: the function will change setHeight to 0px. 
    // Else, if it’s already 0px it will change to the value of the contentscrollHeight.
    setContentHeight(
      activeState === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return(
    <div className="cards large">
          <h2 className='lower-layer'>{title}</h2>
          <div className="circle" >
            <h2>{title}</h2>
          </div>
          <div className='card-content'>
            <p
              className={`collapsible  ${activeState}`}
              onClick={toggelCollapse}
            >
              {initialContent}
            </p>
            <div
              ref={content}
              style={{ maxHeight: `${contentHeight}` }}
              className="collapse-content-card"
            >
              <br/>
              {children}
              <br/>
            </div>
          </div>
        </div>
  )
}

export default InstructionCard;