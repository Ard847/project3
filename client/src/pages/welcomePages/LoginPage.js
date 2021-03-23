// packages
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import './LoginPage.css';

// context
import LoggedInContext from '../../context/LoggedInContext'

// components
import AccountForm from '../../components/forms/AccountForm';
import LogInTitles from '../welcomeTitles/LogInTitles';

// functions
import saveToSession from '../../functions/saveToSession';
import fetcher from '../../functions/fetcher';
import getSession from '../../functions/getSession';



const LoginPage = () => {

  const { loggedIn, userLoggedIn } = useContext(LoggedInContext);
  const [userNoMatch, setUserNoMatch] = useState(false);

  let id = '';
  if (loggedIn) {
    id = getSession('id');
  }

  const handleSubmit = async (user) => {
    // console.log('LoginPage, handleSubmit, user =', user);
    const url = "/api/user/login";
    const response = await fetcher(url, "POST", user);
    // console.log('response =', response);

    if (response.message === 'success') {
      // console.log('Success');

      const authResponse = await fetcher("/api/user/authentication", "GET", '', response.token);
      //console.log('authResponse =', response.token);
      if (authResponse.success) {
        saveToSession('id', response.user.id);
        saveToSession('token', response.token);
        userLoggedIn();
        setUserNoMatch(false);
      }

    } else {
      setUserNoMatch(true);
    }

  }

  if (loggedIn === false) {

    return (
      <>
        <LogInTitles />
        <section>
          <article id='login-content'>
            <AccountForm type={'login'} onSubmit={handleSubmit} />
            {userNoMatch && (
              <p
                className="error-login-msg text-center"
              >
                The credentials do not match any users!
              </p>
            )}
          </article>
        </section>
      </>
    )

  } else if (loggedIn === true) {
    return (
      <Redirect to={`/logIn/${id}`} />
    );
  }
}

export default LoginPage;