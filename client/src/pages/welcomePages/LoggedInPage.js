// packages
import React, { useContext } from 'react';
import {Redirect} from 'react-router-dom';

// styles
import './LoginPage.css';

// context
import LoggedInContext from '../../context/LoggedInContext'

// components
import WelcomeTitles from '../../components/WelcomeTitles';
import ChooseHousehold from '../../components/ChooseHousehold';


const LoggedInPage = () => {

  const { loggedIn, userLoggedOut } = useContext(LoggedInContext);
    
  if (loggedIn === true){
    return (
      <>
      <WelcomeTitles />
      <section>
      <article id='login-content'>
        <h1>MyHouseholds: </h1>
        <button onClick={userLoggedOut}>Log Out</button>
        <ChooseHousehold />
      </article>
      </section>
      </>
    )
  } else {
    return (<Redirect to={`/logIn`} />)
  }
}

export default LoggedInPage;
      