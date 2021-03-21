// packages
import React, { useContext, useState } from 'react';

// styles
import './LoginPage.css';

// context
import LoggedInContext from '../../context/LoggedInContext'

// components
import AccountForm from '../../components/forms/AccountForm';
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import saveToSession from '../../functions/saveToSession';
import fetcher from '../../functions/fetcher';


const LoginPage = ({location}) => {

  const { loggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);
  const [ userNoMatch, setUserNoMatch ] = useState(false);

  const handleSubmit = async (user) => {
    // console.log('LoginPage, handleSubmit, user =', user);
    const url = "/api/user/login";
    const response = await fetcher(url, "POST", user);
    console.log('response =', response);

    if( response.message === 'success' ){
      console.log('Success');

      const authResponse = await fetcher("/api/user/authentication", "GET", '', response.token);
      //console.log('authResponse =', response.token);
      if(authResponse.success){
        saveToSession('id', response.user.id);
        saveToSession('token',response.token);
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
      <WelcomeTitles />
      <section>
      <article id='login-content'>
        <h1>Log-in Page</h1>
        <p>You are not yet logged in, please provide your details below to access your account</p>
        <AccountForm type={'login'} onSubmit={handleSubmit} />
        {userNoMatch && (
          <p>The credentials do not match any users.</p>
        )}
      </article>
      </section>
      </>
      
    )

  } else if (loggedIn === true){

    return (
      <>
      <WelcomeTitles />
      <section>
      <article id='login-content'>
        <h1>Log-in Page</h1>
        <p>You are logged in. Navigate to the Home page to see your housholds or create a new one. </p>
        <button onClick={userLoggedOut}>Log Out</button>
      </article>
      </section>
      </>
    )
  }
}

export default LoginPage;