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

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';


const LoginPage = ({location}) => {

  const { loggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);
  const [ userMatch, setUserMatch ] = useState(false);
  useSiteLocation(location);

  const handleSubmit = async (user) => {
    console.log('LoginPage, handleSubmit, user =', user);
    const url = `/api/user/findOne?username=${user.username}&email=${user.email}&password=${user.password}`;
    const fetchUser = await fetch(url);
    const response = await fetchUser.json();
    console.log('response =', response);
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
      <>
      <WelcomeTitles />
      <section>
      <article id='login-content'>
        <h1>Log-in Page</h1>
        <p>You are not yet logged in, please provide your details below to access your account</p>
        <AccountForm type={'login'} onSubmit={handleSubmit} />
        {userMatch && (
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