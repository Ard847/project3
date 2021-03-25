// packages
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
// styles
import './App.css';
// pages
import HomePage from '../pages/welcomePages/HomePage';
import AboutPage from '../pages/welcomePages/AboutPage';
import Instructions from '../pages/welcomePages/Instructions';
import LoginPage from '../pages/welcomePages/LoginPage';
import SignupPage from '../pages/welcomePages/SignupPage';
import CreateHouse from '../pages/welcomePages/CreateHouse';
import LoggedInPage from '../pages/welcomePages/LoggedInPage';
import DashApp from '../pages/dashboardPages/DashApp';
// components
import NavBar from '../components/navigation/Navbar';


const App = () => {

  return (
    <div id='App'>
      <Router >
        <NavBar/>
          <main>
            <Route exact path='/' component={HomePage} />
            {/* <Route exact path='/home/:id' component={LoggedInHome} /> */}
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/instructions' component={Instructions} />
            <Route exact path='/logIn' component={LoginPage} />
            <Route exact path='/logIn/:id' component={LoggedInPage} />
            <Route exact path='/signUp' component={SignupPage} />
            <Route exact path='/createHousehold' component={CreateHouse} />
            <Route path='/dashboard/:id/:householdID' component={DashApp} />
          </main>
      </Router >
    </div>
  );
}


export default App;
