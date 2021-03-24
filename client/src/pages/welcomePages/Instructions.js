// packages
import React from 'react';

//images
import PreviewImg from '../../images/previewApp-01.png'

// styles
import './Instructions.css';


const Instructions = () => {

  return (
   <>
   <header>
   <div className="instruction-text-wrap">
   <h1 className="text-left instruction-title">How to use</h1>
   <p className="subheading text-center">Here are some steps you can follow to make using this app easier</p>
   </div>
   </header>
    <div className="containers instruction-container">
      <div className="cards">
        <div className="circle">
          <h2>01</h2>
        </div>
        <div className="content">
          <p>Login or register if you don't have an account</p>
        </div>
      </div>
      <div className="cards">
        <div className="circle">
          <h2>02</h2>
        </div>
        <div className="content">
          <p>Schedule tasks using our easy to use kanban board</p>
        </div>
      </div>
      <div className="cards">
        <div className="circle">
          <h2>03</h2>
        </div>
        <div className="content">
          <p>Invite your family and assign tasks to each memeber</p>
        </div>
      </div>     
    </div>
    </>
  )
}

export default Instructions;