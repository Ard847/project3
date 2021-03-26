//packages
import React from "react";

//styles
import "./WelcomeTitles.css";


const AboutTitles = () => {

  return (
    <section id='app-titles'>

      <div className="coll-1">
        <h2 className="sorted-title">About Us</h2>
        <h3>Assign tasks amongst your family </h3>
        <p>
          At Sorted, we wanted to help you to live your best life and not let mundane
          jobs stop you reaching your goals.
        </p>
        <p>
          The idea for the project came from a friend who finds tasks and the running
          of her household build up and become overwhelming for her; often finding it
          difficult to know where to begin to start tackling the jobs. 
        </p>
        <p>
          It can cause
          anxiety and the feeling of endless-ness as tasks come back around week on week mixed
          with the larger more infrequent tasks that are needed.
        </p>
        <p>
          We wanted to create an application that would reduce the apparent load and remove the need
          to choose which jobs to start on first.
        </p>

      </div>

    </section>
  );
}

export default AboutTitles;