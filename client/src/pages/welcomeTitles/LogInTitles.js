//packages
import React from "react";

//styles
import "./WelcomeTitles.css";


const LoginTitles = () => {

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">Log In: </h2>
        <h3>Your Household Awaits</h3>
        <p>
          Log In by filling in the credentials you signed up with. 
          This will take you through to the 'My Households' area 
          where you can start managing your daily tasks.
        </p>
        
      </div>

    </section>
  );
}

export default LoginTitles;