// packages
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// styles
import './App.css';

// context
import LocationContext from '../context/LocationContext';

// pages
import HomePage from '../pages/welcomePages/HomePage';
import AboutPage from '../pages/welcomePages/AboutPage';
import LoginPage from '../pages/welcomePages/LoginPage';
import SignupPage from '../pages/welcomePages/SignupPage';
import CreateHouse from '../pages/welcomePages/CreateHouse';
import ChooseHouse from '../pages/welcomePages/ChooseHouse';
// import NoMatchPage from '../pages/welcomePages/NoMatchPage';

import DashboardHome from '../pages/dashboardPages/DashboardHome';

// components
import NavBar from '../components/Navbar';



const App = () => {

  const { siteLocation } = useContext(LocationContext);
  console.log('siteLocation =', siteLocation);

  // const welcomePages = ['/', '/about', '/logIn', '/signUp', '/createHousehold'];

  return (
    <div id='App'>
      <Router >
        {/* <Switch> */}
          <NavBar />
          <main>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home/:id' component={ChooseHouse} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/logIn' component={LoginPage} />
            <Route exact path='/signUp' component={SignupPage} />
            <Route exact path='/createHousehold' component={CreateHouse} />
            <Route exact path='/dashboard/:id/:householdID' component={DashboardHome} />
            {/* <Route component={NoMatchPage} /> */}
          </main>
        {/* </Switch> */}
      </Router >
    </div>
  );
}

export default App;
