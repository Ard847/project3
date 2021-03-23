//packages
import React from "react";
//styles
import "./WelcomeTitles.css";

//images
import IMG from './images/bg33-01.png';

function WelcomeTitles() {

  return (
    <main>
        <div className="homepage-column">
          <h2 className="sorted-title">Sorted:</h2>
          <h3>Home Management System</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde earum accusamus neque exercitationem inventore corporis tempora incidunt, laborum odio distinctio architecto nihil in quod iste, praesentium, velit repellat nesciunt. Eum!</p>
          <a href="/login"><button className="btn btn-primary" type="button">Get Started</button></a>
        </div>
        <section>
          <img src={IMG} className="background-img" />
        </section>
     
    </main>

  );
}

export default WelcomeTitles;

/*  <div className="container">
      <div className="row">
        <div className="coll-1">
          <h2 className="sorted-title">Sorted:</h2>
          <h3>Home Management System</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde earum accusamus neque exercitationem inventore corporis tempora incidunt, laborum odio distinctio architecto nihil in quod iste, praesentium, velit repellat nesciunt. Eum!</p>
          <a href="/login"><button className="btn btn-primary" type="button">Get Started</button></a>
        </div>
        <div className="col-2">
          <img src={IMG} className="background-img" />
        </div>
      </div>
    </div> */