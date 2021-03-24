//packages
import React from "react";

//styles
import "./WelcomeTitles.css";


const SignUpTitles = () => {

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">Sign Up</h2>
        <h3>Create your personal profile</h3>
        <p>
        Here you can create your account. 
        </p>
        <p>
        You will need to fill in the fields required including 
        choosing a personal colour swatch. This will distinguish 
        personal tasks and areas for you from those of your household.
        </p>
        <p>
        Once complete you will need to login. From there you can set your 
        profile image and households.
        </p>
        
      </div>

    </section>
  );
}

export default SignUpTitles;