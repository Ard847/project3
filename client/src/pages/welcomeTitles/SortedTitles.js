//packages
import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';

//styles
import "./WelcomeTitles.css";

// context
import LoggedInContext from '../../context/LoggedInContext';


const SortedTitles = () => {

  const { loggedIn } = useContext(LoggedInContext);

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">Sorted:</h2>
        {
          ( loggedIn ) 
          ? <h3> Create New Household</h3>
          : <h3> Home Management System</h3>
        }
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Unde earum accusamus neque exercitationem inventore corporis tempora incidunt, 
          laborum odio distinctio architecto nihil in quod iste, praesentium, velit repellat 
          nesciunt. Eum!
        </p>
        {
          ( loggedIn ) 
          ? <NavLink to="/logIn"><button type="button">My Households</button></NavLink>
          : <NavLink to="/logIn"><button type="button">Get Started</button></NavLink>
        }
        
      </div>

    </section>
  );
}

export default SortedTitles;