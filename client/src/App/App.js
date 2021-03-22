// packages
import React from 'react';
// import { useContext } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// styles
import './App.css';

// context
// import LocationContext from '../context/LocationContext';

// pages
import HomePage from '../pages/welcomePages/HomePage';
import LoggedInHome from '../pages/welcomePages/LoggedInHome';
import AboutPage from '../pages/welcomePages/AboutPage';
import Instructions from '../pages/welcomePages/Instructions';
import LoginPage from '../pages/welcomePages/LoginPage';
import SignupPage from '../pages/welcomePages/SignupPage';
import CreateHouse from '../pages/welcomePages/CreateHouse';
import LoggedInPage from '../pages/welcomePages/LoggedInPage';
// import NoMatchPage from '../pages/welcomePages/NoMatchPage';

import DashApp from '../pages/dashboardPages/DashApp';

// components
import NavBar from '../components/navigation/Navbar';



const App = () => {

  // const { siteLocation } = useContext(LocationContext);
  // console.log('siteLocation =', siteLocation);

  return (
    <div id='App'>
      <Router >
        {/* <Switch> */}
          <NavBar />
          <main>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home/:id' component={LoggedInHome} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/instructions' component={Instructions} />
            <Route exact path='/logIn' component={LoginPage} />
            <Route exact path='/logIn/:id' component={LoggedInPage} />
            <Route exact path='/signUp' component={SignupPage} />
            <Route exact path='/createHousehold' component={CreateHouse} />
            <Route path='/dashboard/:id/:householdID' component={DashApp} />
            {/* <Route component={NoMatchPage} /> */}
          </main>
        {/* </Switch> */}
      </Router >
    </div>
  );
}

export default App;
