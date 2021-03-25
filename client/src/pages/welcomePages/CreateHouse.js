// packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './CreateHouse.css';

// components
import HouseForm from '../../components/forms/HouseForm';
import SortedTitles from '../welcomeTitles/SortedTitles';

// functions
import getSession from '../../functions/getSession';
 

// hooks


const CreateHouse = () => {

  const id = getSession('id');
 

  return (
    <>
     <SortedTitles />
      <section>
        <article id='create-household-content'>
          
          <HouseForm userID={id} type={'create'} />
          <h4>or</h4>
          <h3> Join an Existing Household</h3>
          <HouseForm userID={id} type={'join'} />

          <button><NavLink to='/logIn/:userID' >Back to Households</NavLink></button>
        </article>
      </section>
    </>

  );
}

export default CreateHouse;