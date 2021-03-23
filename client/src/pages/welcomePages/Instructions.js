// packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

//images
import PreviewImg from '../../components/images/previewApp-01.png'

// styles
import './Instructions.css';

// hooks
//import useSiteLocation from '../../hooks/useSiteLocation';

const Instructions = ({ location }) => {


  //useSiteLocation(location);




  return (
   <>
   <div className="instruction-text-wrap">
   <h1 className="text-center instruction-title">How to use</h1>
   <p className="subheading text-center">Here are some steps you can follow to make using this app easier</p>
   </div>
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
    <div className="container">
        <img className="preview-image" src={PreviewImg}/>
      </div>
    </>
  )
}

export default Instructions;