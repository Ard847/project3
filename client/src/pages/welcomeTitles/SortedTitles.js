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
        <h3> Home Management System</h3>
        
        {
          (loggedIn)
            ? (<>
              <p>
                Welcome to sorted, a home management tool that enables families to manage tasks around the home.
              </p>
              <p>
                Sorted Task Manager takes the tasks you program in and delivers you a list for the day including 
                priority and task duration in order for you to easily fit your jobs around your life and leisure.
              </p>
              <p>Great, you've logged In, now you can begin by creating a household, joining or opening an existing 
                household. Follow the link below or in the Navigation bar called My Households.</p>
              </>)
            :
            (<>
            <p>
              Welcome to sorted, a home management tool that enables families to manage tasks around the home.
            </p>
            <p>
              Sorted Task Manager takes the tasks you program in and delivers you a list for the day including 
              priority and task duration in order for you to easily fit your jobs around your life and leisure.
            </p>
            </>)
        }
        {
          (loggedIn)
            ? <NavLink to="/logIn"><button type="button">My Households</button></NavLink>
            : <NavLink to="/logIn"><button type="button">Get Started</button></NavLink>
        }

      </div>

    </section>
  );
}

export default SortedTitles;