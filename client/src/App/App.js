// packages
import { useContext } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

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
        <NavBar />
        <main>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/logIn' component={LoginPage} />
            <Route exact path='/signUp' component={SignupPage} />
            <Route exact path='/createHousehold' component={CreateHouse} />
            <Route exact path='/dashboard/:householdID' component={DashboardHome} />
        </main>
      </Router >
    </div>
  );
}

export default App;
