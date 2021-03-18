// packages
import React, { useContext } from 'react';
import {Redirect} from 'react-router-dom';

// styles
import './HomePage.css';

// context
import LoggedInContext from "../../context/LoggedInContext";

// components
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';



const HomePage = () => {

  const { loggedIn } = useContext(LoggedInContext);

  const id = getSession('id');

  if (loggedIn){
    return (<Redirect to={`/home/${id}`} />);
    // return browserHistory.push(`/${id}`);
  } else {
    return (
      <>
        <WelcomeTitles />
        <section>
          <article id='home-content'>
            <h2>Log In or Sign Up to see your Households</h2>
          </article>
        </section>
      </>
    )
  }

}

export default HomePage;