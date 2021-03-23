// packages
import React from 'react';

// styles
import './AboutPage.css';

//image
import AboutImg from '../../images/aboutBg-01.png'

// components
import AboutTitles from '../welcomeTitles/AboutTitles';


const AboutPage = () => {


  return (
    <>
      <AboutTitles />
      <section >
        <article id='about-content'>
          <div >
            <img className="about-img" src={AboutImg} />
          </div>
        </article>
      </section>
    </>
  );
}

export default AboutPage;