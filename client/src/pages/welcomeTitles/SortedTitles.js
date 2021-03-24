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
        {
          ( loggedIn )
        ? <p>
          To create a new household, upload any image that you would like to represent your household. Then Enter the name of your house. However if you would like to join a household that is already created then simply input the household ID and click join. You can now click the button 'My household' or 'Back to households' and you can view your household.
        </p>
        :<p>
        Welcome to sorted, a home management tool that enables families to manage tasks around the home.
       
      </p>
        }
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