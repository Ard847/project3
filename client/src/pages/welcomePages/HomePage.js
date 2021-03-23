// packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import './HomePage.css';

//images
import HomeImage from '../../images/bg33-01.png';

// context
import LoggedInContext from "../../context/LoggedInContext";

// components
import SortedTitles from '../welcomeTitles/SortedTitles';

// functions
import getSession from '../../functions/getSession';



const HomePage = () => {

  const { loggedIn } = useContext(LoggedInContext);

  const id = getSession('id');

  if (loggedIn) {
    return (<Redirect to={`/home/${id}`} />);
  } else {
    return (
      <>
        <SortedTitles />
        <section>
          <article id='home-content'>
            <div >
              <img src={HomeImage} className="background-img" />
            </div>
          </article>
        </section>
      </>
    )
  }

}

export default HomePage;