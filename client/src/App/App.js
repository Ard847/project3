// packages
import { useContext, useEffect, useState } from 'react';
import { HashRouter as Router, NavLink, Route } from 'react-router-dom';

// styles
import './App.css';

// pages
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CreateHouse from '../pages/CreateHouse';


function App() {

  return (
    <div id='App'>
      <Router >
        <nav>
          <p id='brand'>Logo</p>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/logIn'>Log In </NavLink>
          <NavLink to='/signUp'>Sign Up</NavLink>
        </nav>

        <main>
          <section id='app-titles'>
            <h1 id='main-title'>Welcome to Household Manager.</h1>
            <h3>Manage your Home with style.</h3>

          </section>
          <section id='app-content'>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/logIn' component={LoginPage} />
            <Route exact path='/signUp' component={SignupPage} />
            <Route exact path='/createHousehold' component={CreateHouse} />
          </section>
        </main>
      </Router >
    </div>
  );
}

export default App;
