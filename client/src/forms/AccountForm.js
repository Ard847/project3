// packages
import React, { useState } from 'react';

// styles
import './AccountForm.css';


const LoginForm = ({ type }) => {

  console.log('AccountForm.js, type =', type);
  
  const [fNameInput, setFNameInput] = useState('');
  const [lNameInput, setLNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');

  const fNameInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setFNameInput(event.target.value);
  }

  const lNameInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setLNameInput(event.target.value);
  }

  const emailInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setEmailInput(event.target.value)
  }

  const usernameInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setUsernameInput(event.target.value);
  }

  const passwordInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setPasswordInput(event.target.value);
  }

  const confirmInputChange = (event) => {
    console.log('emailInputChange =', event.target.value);
    setConfirmInput(event.target.value);
  }

  const submitForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <form>
      
      { (type === 'create-account') && (
        <>
          <label htmlFor='first-name'>First Name:</label>
          <input
            id='first-name'
            type='text'
            placeholder='Enter your first name.'
            onChange={fNameInputChange}
          />
        </>) 
      }

      
      { (type === 'create-account') && (
        <>
          <label htmlFor='last-name'>Last Name:</label>
          <input
            id='first-name'
            type='text'
            placeholder='Enter your Last name.'
            onChange={lNameInputChange}
          />
        </>) 
      }
      
      { ( type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            placeholder='Enter Email'
            onChange={emailInputChange}
          />
        </>
      ) }
      
      { ( type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            placeholder='Enter Username'
            onChange={usernameInputChange}
          />
        </>
      ) }

      { ( type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='text'
            placeholder='Enter Password'
            onChange={passwordInputChange}
          />
        </>
      ) }

      { (type === 'create-account') && (
        <>
          <label htmlFor='confirm-password'>Confirm Password:</label>
          <input
            id='confirm-password'
            type='text'
            placeholder='Please confirm your password'
            onChange={confirmInputChange}
          />
        </>) 
      }

      { (type === 'create-account') && (<button onClick={submitForm}>Create Account</button>) }
      { (type === 'login') && (<button onClick={submitForm}>Log-in</button>) }

    </form>
  )
}

export default LoginForm;