//packages
import React from "react";
import { NavLink } from 'react-router-dom';

//styles
import "./WelcomeTitles.css";


const SortedTitles = () => {

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">Sorted:</h2>
        <h3>Home Management System</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Unde earum accusamus neque exercitationem inventore corporis tempora incidunt, 
          laborum odio distinctio architecto nihil in quod iste, praesentium, velit repellat 
          nesciunt. Eum!
        </p>
        <NavLink to="/logIn"><button className="btn btn-primary" type="button">Get Started</button></NavLink>
      </div>

    </section>
  );
}

export default SortedTitles;