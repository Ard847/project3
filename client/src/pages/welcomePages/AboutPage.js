// packages
import React from 'react';

// styles
import './AboutPage.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';

// components
//import WelcomeTitles from '../../components/WelcomeTitles';


const AboutPage = ({location}) => {

  useSiteLocation(location);

  return (
    
    <section className="about" style={{ marginTop: '100px', height: '100vh'}}>
<div className="container">
<div className="row">
<div className="col-lg-6">
 
</div>
<div className="col-lg-6 mt-5 mt-lg-0 title">
  <h2>About Us</h2>
  <h4> Heading...</h4>
  <p className="text-section">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi quia numquam eos explicabo iure perspiciatis. Libero, ab enim impedit, quis porro corrupti quo est minima sint consequuntur nulla illum eius.</p>
</div>
</div>
</div>

</section>
  )
}

export default AboutPage;