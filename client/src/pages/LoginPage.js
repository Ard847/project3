// packages
import React, { useContext, useState } from 'react';

// styles
import './LoginPage.css';

// context
import LoggedInContext from '../context/LoggedInContext'

// components
import AccountForm from '../forms/AccountForm'

// functions
import saveToSession from '../functions/saveToSession';

const LoginPage = () => {

  const { loggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);
  const [ userMatch, setUserMatch ] = useState(false);

  const handleSubmit = async (user) => {
    // console.log('LoginPage, handleSubmit, user =', user);
    const url = `/api/user/findOne?username=${user.username}&email=${user.email}&password=${user.password}`;
    const fetchUser = await fetch(url);
    const response = await fetchUser.json();

    if(response.user === null){
      console.log('The credentials do not match any users');
      setUserMatch(true);

    } else {
      console.log('response.user =', response.user);
      setUserMatch(false);
      const key = 'id';
      const value = response.user.id;
      saveToSession(key, value);
      userLoggedIn();
    }
  }

  if (loggedIn === false){

    return (
      <article id='login-content'>
        <h1>Log-in Page</h1>
        <p>You are not yet logged in, please provide your details below to access your account</p>
        <AccountForm type={'login'} onSubmit={handleSubmit} />
        {userMatch && (
          <p>The credentials do not match any users.</p>
        )}
        <button onClick={userLoggedIn}>Log In - testing</button>
      </article>
    )

  } else if (loggedIn === true){

    return (
      <article id='login-content'>
        <h1>Log-in Page</h1>
        <p>You are logged in. Navigate to the Home page to see your housholds or create a new one. </p>
        <button onClick={userLoggedOut}>Log Out</button>
      </article>
    )

  }

}

export default LoginPage;