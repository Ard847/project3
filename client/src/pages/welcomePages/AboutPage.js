// packages
import React from 'react';

// styles
import './AboutPage.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';

// components
import WelcomeTitles from '../../components/WelcomeTitles';
import Clock from '../../components/Clock';


const AboutPage = ({location}) => {

  useSiteLocation(location);

  return (
    <>
    <WelcomeTitles />
    <section>
      <article id='about-content'>
        <h2>How to manage your home with us</h2>
        <p>
          Here goes some instructions for using the application. 
        </p>
        <Clock date={true} day={true} month={true} year={true} time={true}/>
        
      </article>
    </section>
    </>
  )
}

export default AboutPage;