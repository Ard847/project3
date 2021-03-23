// packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import './LoginPage.css';

// context
import LoggedInContext from '../../context/LoggedInContext'

// components
import MyHouseholdTitles from '../welcomeTitles/MyHouseholdsTitles';
import ChooseHousehold from '../../components/ChooseHousehold';


const LoggedInPage = () => {

  const { loggedIn } = useContext(LoggedInContext);

  if (loggedIn === true) {
    return (
      <>
        <MyHouseholdTitles />
        <section>
          <article id='login-content'>
            
            <ChooseHousehold />
          </article>
        </section>
      </>
    )
  } else {
    return (
    <Redirect to={`/logIn`} />
    );
  }
}

export default LoggedInPage;
