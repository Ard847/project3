// packages
import React, { useContext } from 'react';
import {Redirect} from 'react-router-dom';

// styles
import './HomePage.css';

// hooks
import useSiteLocation from '../../hooks/useSiteLocation';

const Contact = ({ location }) => {

  
  useSiteLocation(location);



  
    return (
      
        <div>
            <section className="contact r-p">
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <h2>Get In Touch</h2>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control" placeholder="Name"/>
              </div>
              <div className="form-group col-md-6">
                <input type="email" className="form-control" placeholder="Email"/>
              </div>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Subject"/>
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="7" placeholder="your message" style={{resize: 'none'}}></textarea>
            </div>
            <button type="submit" className="btn r-btn">Submit</button>
          </form>
        </div>
      </div>
      </div>
  </section>
  
        </div>
        
      
      
    )
  }



export default Contact;