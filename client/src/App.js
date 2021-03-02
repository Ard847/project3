import './App.css';
import {useContext, useEffect,useState} from 'react';
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router,Link, Route} from 'react-router-dom';
import {UserContext} from './userContext';
import home from './home';
import about from './about';

function App() {
 const [value,setValue] = useState('logged out')
 const [bool,setBool] = useState([])

 useEffect(() => {
   const fetcherFun = async () => {
   const fetcher = await fetch('http://localhost:3001/api/result')
   setBool(true)
   const response = await fetcher.json()
   setBool(false)
   console.log(response)
 }
 fetcherFun()
 },[])
 return (
   <div>
   <UserContext.Provider value = {{value,setValue}} >
    <Router>
       <p><NavLink to = "/about">About</NavLink></p>
       <p><NavLink to = "/">Home</NavLink></p>
        <Route exact path = "/" component = {home}/>
        <Route exact path = "/about" component = {about}/>
   </Router>
   </UserContext.Provider>
   </div>
 );
}

export default App;
