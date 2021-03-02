import {useState, useContext} from 'react';
import {UserContext} from "./userContext";

const About = () => {
    const {value,setValue} = useContext(UserContext)
    return(
    <h1>{value}</h1>
        
        )
 }

export default About;