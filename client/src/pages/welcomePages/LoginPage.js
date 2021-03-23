// packages
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import './LoginPage.css';

import NavBar from '../../components/navigation/Navbar'

// context
import LoggedInContext from '../../context/LoggedInContext'

// components
import AccountForm from '../../components/forms/AccountForm';

// functions
import saveToSession from '../../functions/saveToSession';
import fetcher from '../../functions/fetcher';
import getSession from '../../functions/getSession';


import LoggedInHome from './LoggedInHome';


const LoginPage = ({location}) => {

  const { loggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);
  const [ userNoMatch, setUserNoMatch ] = useState(false);

  let id = '';
  if (loggedIn) {
    id = getSession('id');
  }


  const handleSubmit = async (user) => {
    // console.log('LoginPage, handleSubmit, user =', user);
   //saveToSession('token',)
    const url = "/api/user/login"
    const response = await fetcher(url,"POST",user)
    console.log('response =', response);

    if( response.message === 'success' ) {
      console.log('Success');

      const authResponse = await fetcher("/api/user/authentication", "GET", '', response.token);
      //console.log('authResponse =', response.token);
      if(authResponse.success) {
        saveToSession('id', response.user.id);
        saveToSession('token',response.token)
        userLoggedIn();
        setUserNoMatch(false);
      }

    } else {

      setUserNoMatch(true);
    }

    // console.log('loggedIn =', loggedIn);
 
  } 

  if (loggedIn === false){

    return (
      <>
      <NavBar/>
      <section>
      <article id='login-content' className="loginInForm">
        
       
        <AccountForm type={'login'} onSubmit={handleSubmit} />
        {userNoMatch && (
          <p className="error-login-msg text-center">The credentials do not match any users!</p>
        )}
      </article>
      </section>
      </>
      
    )

  } else if (loggedIn === true){

    return (
    <Redirect to={`/logIn/${id}`} />
    )
  }
}

export default LoginPage;