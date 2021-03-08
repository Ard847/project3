// packages
import React, {useContext} from 'react';

// styles
import './SignupPage.css';

// context
import LoggedInContext from '../context/LoggedInContext'

// components
import AccountForm from '../forms/AccountForm'


const SignupPage = () => {

  const { loggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);

  if (loggedIn === false){

    return (
      <article id='login-content'>
        <h1>Sign Up Page</h1>
        <p>If you do not have an account you can create one here. </p>
        <AccountForm type={'create-account'} />
        <button onClick={userLoggedIn}>Log In - testing</button>
      </article>
    )

  } else if (loggedIn === true){

    return (
      <article id='login-content'>
        <h1>Sign Up Page</h1>
        <p>You are currently logged in to an account. To Create a new User please log out first. </p>
        <button onClick={userLoggedOut}>Log Out</button>
      </article>
    )

  }
}

export default SignupPage;