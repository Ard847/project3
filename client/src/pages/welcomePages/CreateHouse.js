// packages
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';



// styles
import './CreateHouse.css';

// components
import HouseForm from '../../components/forms/HouseForm';
import WelcomeTitles from '../../components/WelcomeTitles';
import NavBar from '../../components/navigation/Navbar'

// functions
import getSession from '../../functions/getSession';
 

// hooks


const CreateHouse = () => {

  const id = getSession('id');
 /*  const [fileInputState,setFileInputState] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [previewSource,setPreviewSource] = useState('')
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result) 
    }
  } */

  return (
    <>
      <NavBar/>
      <section>
        <article id='create-household-content'>
          <h2> Create New Household</h2>
    
          <HouseForm userID={id} type={'create'} />

          <h2> Join an Existing Household</h2>
          <HouseForm userID={id} type={'join'} />

          <NavLink to='/logIn/:userID' >Back to Households</NavLink>
        </article>
      </section>
    </>

  );
}

export default CreateHouse;