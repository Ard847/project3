import {useState, useContext} from 'react';
import {UserContext} from "./userContext";

const Home = () => {
    const {value,setValue} = useContext(UserContext)
    const click = () => {
        setValue("logged in")
    }
    const clicked = () => {
        setValue("logged out")
    }

    return( 
    <div>
        <h1>{value}</h1>
        <p onClick = {click}>Click on me to log in</p>
        <p onClick = {clicked}>Click on me to log out</p>
    </div>)
 }

export default Home;