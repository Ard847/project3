//packages
import React from "react";

//styles
import "./WelcomeTitles.css";


const CreateTitles = () => {

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">Create Household</h2>
        <h3>Make a new household or join an existing one.</h3>
        <p>
          Here you can create your household.
        </p>
        <p>
          You will need to fill in the fields; either enter the name of your household and upload an image to
          create a new home. You do not need to have an image of your household on hand, you can upload or 
          change this later in User Profile.
        </p>
        <p>
          To Join a household, another member of the household will need to give you the ID code. Then simply 
          input the house ID code into the join form to join someone else's premade household.
        </p>

      </div>

    </section>
  );
}

export default CreateTitles;