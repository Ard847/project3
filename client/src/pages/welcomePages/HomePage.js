// packages
import React from 'react';

// styles
import './HomePage.css';

//images
import HomeImage from '../../images/bg33-01.png';
import PreviewImg from '../../images/previewApp-01.png';

// components
import SortedTitles from '../welcomeTitles/SortedTitles';

const HomePage = () => {

  return (
    <>
      <SortedTitles />
      <section>
        <article id='home-content'>
          <div >
            <img src={HomeImage} className="background-img" alt='home styling' />
          </div>
        </article>
      </section>
      <section id='computer-image'>
        <div className="container">
          <div>
            <h2 className="text-center subheading">Take us with you: </h2>
            <h3 className="subheading text-center">
              We are a fully responsive Web application to make it easy 
              for you to use us on any device you choose, at home or out and 
              about. 
            </h3>
          </div>
          <img className="preview-image" src={PreviewImg} alt='home styling' />
        </div>
      </section>
    </>
  )

}

export default HomePage;