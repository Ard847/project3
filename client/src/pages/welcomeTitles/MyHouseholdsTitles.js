//packages
import React, { useContext } from "react";

//styles
import "./WelcomeTitles.css";

// context
import LoggedInContext from '../../context/LoggedInContext'


const MyHouseholdTitles = () => {

  const { userLoggedOut } = useContext(LoggedInContext);

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">My Households :</h2>
        <h3>Create, join or open an existing Household.</h3>
        <p>
          Here you will be able to see all the households you are apart of. 
        </p>
        <p>
          Don't worry if you can't see any yet, you just need to create a new household. You dont have to upload an 
          image at this stage if you do not wish, we have included a fun graphic to hold the place for you in the mean 
          time. 
        </p>
        <p>
          Click on any name or icon to enter. 
        </p>
        <p>
          Alternativley you can log out below and on the Sign Up page.  
        </p>
        <button onClick={userLoggedOut} >Log Out</button>
      </div>

    </section>
  );
}

export default MyHouseholdTitles;