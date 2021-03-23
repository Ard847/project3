// packages
import React from 'react';

// styles
import './AboutPage.css';

//image
import AboutImg from '../../components/images/aboutBg-01.png'

// hooks
//import useSiteLocation from '../../hooks/useSiteLocation';

// components
//import WelcomeTitles from '../../components/WelcomeTitles';


const AboutPage = ({ location }) => {

 // useSiteLocation(location);

  return (
<>
    <section>
    <div className="about-container">
    <div className="row">
      <div className="about-column title">
            <h2>About Us</h2>
            <h3> Assign tasks amongst your family </h3>
            <p className="text-section">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi quia numquam eos explicabo iure perspiciatis. Libero, ab enim impedit, quis porro corrupti quo est minima sint consequuntur nulla illum eius.</p>
          </div>
          <div className=" col-2 about-image-column">
          <img className="about-img" src={AboutImg} />
          </div>
          </div>
          </div>
          

    </section>
    </>
  )
}

export default AboutPage;
