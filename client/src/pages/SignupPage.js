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

  const handleCreate = (user) => {
    const url = '/api/user/createNew';
      fetch(url, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  if (loggedIn === false){

    return (
      <article id='login-content'>
        <h1>Sign Up Page</h1>
        <p>If you do not have an account you can create one here. </p>
        <AccountForm type={'create-account'} onCreate={handleCreate} />
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