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
          <img className="preview-image" src={PreviewImg} />
        </div>
      </section>
    </>
  )
  
}

export default HomePage;