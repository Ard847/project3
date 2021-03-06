// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './CreateHouse.css';
//font awesome packages
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components
import HouseForm from '../../components/forms/HouseForm';
import CreateTitles from '../welcomeTitles/CreateTitles';

// functions
import getSession from '../../functions/getSession';
 

// hooks


const CreateHouse = () => {

  const id = getSession('id');
 

  return (
    <>
     <CreateTitles />
      <section>
        <article id='create-household-content'>
          
          <HouseForm userID={id} type={'create'} />
          <h4>or</h4>
          <h3> Join an Existing Household</h3>
          <HouseForm userID={id} type={'join'} />

          <button><NavLink to='/logIn/:userID' ><FontAwesomeIcon className="dash-icon" icon={faArrowLeft} />Back to Households</NavLink></button>
        </article>
      </section>
    </>

  );
}

export default CreateHouse;