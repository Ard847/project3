// packages
import React, { useContext } from 'react';
import {Redirect} from 'react-router-dom';

// styles
import './HomePage.css';

// context
import LoggedInContext from "../../context/LoggedInContext";

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';

// components
import WelcomeTitles from '../../components/WelcomeTitles';

// functions
import getSession from '../../functions/getSession';



const HomePage = ({ location }) => {

  const { loggedIn } = useContext(LoggedInContext);
  useSiteLocation(location);

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
            <h2>Add Cards here</h2>
          </article>
        </section>
      </>
    )
  }

}

export default HomePage;