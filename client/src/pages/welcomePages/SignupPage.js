// packages
import React, { useContext, useState } from 'react';

// styles
import './SignupPage.css';

import NavBar from '../../components/navigation/Navbar'

// context
import LoggedInContext from '../../context/LoggedInContext';

// components
import AccountForm from '../../components/forms/AccountForm';
//import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import fetcher from '../../functions/fetcher';



const SignupPage = () => {

  const { loggedIn, userLoggedOut } = useContext(LoggedInContext);

  const [ userCreated, setUserCreated ] = useState(false);

  const handleCreate = async (user) => {
    const url = '/api/user/createNew';
    // const createUserResponse = 
    const createUserResponse = await fetcher(url, 'POST', user);
    console.log('createUserResponse =', createUserResponse);
    if (createUserResponse.message === 'success'){
      setUserCreated(true);
    }
  }

  if (loggedIn === false) {

    return (
      <>
     <NavBar/>
        <section>
          <article id='login-content'>
            
            <AccountForm type={'create-account'} onCreate={handleCreate} onSuccess={userCreated}/>
          </article>
        </section>
      </>

    )

  } else if (loggedIn === true) {

    return (
      <>
     
        <section>
          <article id='login-content'>
            <h1>Sign Up Page</h1>
            <p>You are currently logged in to an account. To Create a new User please log out first. </p>
            <button onClick={userLoggedOut}>Log Out</button>
          </article>
        </section>
      </>

    )

  }
}

export default SignupPage;