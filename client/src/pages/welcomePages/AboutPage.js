// packages
import React from 'react';

// styles
import './AboutPage.css';

// components
import WelcomeTitles from '../../components/WelcomeTitles';


const AboutPage = ({location}) => {

  return (
    <>
    <WelcomeTitles />
    <section>
      <article id='about-content'>
        <h2>How to manage your home with us</h2>
        <p>
          Here goes some instructions for using the application. 
        </p>        
      </article>
    </section>
    </>
  )
}

export default AboutPage;