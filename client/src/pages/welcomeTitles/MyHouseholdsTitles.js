//packages
import React, { useContext } from "react";

//styles
import "./WelcomeTitles.css";

// context
import LoggedInContext from '../../context/LoggedInContext'


const MyHouseholdTitles = () => {

  const { loggedIn, userLoggedOut } = useContext(LoggedInContext);

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">My Households :</h2>
        <h3>Create, join or open an existing Household.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Unde earum accusamus neque exercitationem inventore corporis tempora incidunt,
          laborum odio distinctio architecto nihil in quod iste, praesentium, velit repellat
          nesciunt. Eum!
        </p>
        <button className="btn btn-primary" onClick={userLoggedOut} >Log Out</button>
      </div>

    </section>
  );
}

export default MyHouseholdTitles;