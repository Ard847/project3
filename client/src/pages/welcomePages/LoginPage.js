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

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';


const LoginPage = ({location}) => {

  const { loggedIn,setLoggedIn, userLoggedIn, userLoggedOut } = useContext(LoggedInContext);
  const [ userMatch, setUserMatch ] = useState(false);
  useSiteLocation(location);

  const handleSubmit = async (user) => {
    localStorage.setItem("token","")
    //console.log('LoginPage, handleSubmit, user =', user);
    const {username,email,password} = user
    console.log(username,email,password)
    const url = "/api/user/login"
    const response = await fetcher(url,"Post",user)
    localStorage.setItem("token",response.token)
 
    const authResponse = await fetcher("/api/user/authentication","Get",'token',response.token)
    console.log('au',authResponse)
    if(authResponse.success){
      setLoggedIn(true)
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