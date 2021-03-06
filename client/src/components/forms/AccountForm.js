// packages
import React, { useState } from 'react';

// styles
import './Forms.css';


const AccountForm = ({ type, onCreate, onSubmit, onSuccess, isFieldEmpty, isEmailValid, userExists, userNoMatch }) => {

  // console.log('AccountForm.js, type =', type);

  const [fNameInput, setFNameInput] = useState('');
  const [lNameInput, setLNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [passwordNoMatch, setPasswordNoMatch] = useState(false);
  const [colour, setColourInput] = useState('');

  const fNameInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setFNameInput(event.target.value);
  }

  const lNameInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setLNameInput(event.target.value);
  }

  const emailInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setEmailInput(event.target.value)
  }

  const usernameInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setUsernameInput(event.target.value);
  }

  const passwordInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setPasswordInput(event.target.value);
  }

  const confirmInputChange = (event) => {
    // console.log('emailInputChange =', event.target.value);
    setConfirmInput(event.target.value);
  }

  const colourInputChange = (event) => {
    // console.log('event.target.value =', event.target.value);
    setColourInput(event.target.value)
  }

  const submitCreate = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (passwordInput === confirmInput) {
      const user = {
        firstName: fNameInput,
        lastName: lNameInput,
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        color: colour,
      };
      // console.log('AccountForm.js, submitCreate, user =', user);
      onCreate(user);

    } else {
      // console.log('passwords do not match');
      setPasswordNoMatch(true);
    }
  };

  const submitLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const user = {
      email: emailInput,
      username: usernameInput,
      password: passwordInput,
    }
    onSubmit(user);
  }

  // console.log('onSuccess =', onSuccess);


  return (

    <div className="">

      <div className="cardForm">
        <form className="form-box">
          {(type === 'create-account') && (
            <>
              <label htmlFor='first-name'>First Name:</label>
              <input
                className="inputBox"
                id='first-name'
                type='text'
                placeholder='Enter your first name.'
                onChange={fNameInputChange}
              />
            </>)
          }
          {(type === 'create-account') && (
            <>
              <label htmlFor='last-name'>Last Name:</label>
              <input
                className="inputBox"
                id='last-name'
                type='text'
                placeholder='Enter your Last name.'
                onChange={lNameInputChange}
              />
            </>)
          }
          {(type === 'create-account' || type === 'login') && (
            <>
              <label htmlFor='email'>Email:</label>
              <input
                className="inputBox"
                id='email'
                type='text'
                placeholder='Enter Email'
                onChange={emailInputChange}
              />
            </>
          )}
          {(type === 'create-account' || type === 'login') && (
            <>
              <label htmlFor='username'>Username:</label>
              <input
                className="inputBox"
                id='username'
                type='text'
                placeholder='Enter Username'
                onChange={usernameInputChange}
              />
            </>
          )}
          {(type === 'create-account') && (
            <>
              <label htmlFor='username'>Pick a colour:</label>
              <input
                id='colour'
                className="inputBox"
                type='color'
                onChange={colourInputChange}
              />
            </>
          )}
          {(type === 'create-account' || type === 'login') && (
            <>
              <label htmlFor='password'>Password:</label>
              <input
                id='password'
                className="inputBox"
                type='password'
                placeholder='Enter Password'
                onChange={passwordInputChange}
              />
            </>
          )}
          {(type === 'create-account') && (
            <>
              <label htmlFor='confirm-password'>Confirm Password:</label>
              <input
                className="inputBox"
                id='confirm-password'
                type='password'
                placeholder='Confirm password'
                onChange={confirmInputChange}
              />
            </>)
          }
          {(type === 'create-account' && onSuccess !== true) && (
            <button
              className="submit-btn"
              onClick={submitCreate}>Create Account</button>
          )}
          {(type === 'create-account' && onSuccess === true) && (
            <p className="success text-center" >User was successfully created. go to Log In page to use the application.</p>
          )}
          {(passwordNoMatch && onSuccess === false) && (
            <p className="error text-center" >Your passwords do not match</p>
          )}
          {(onSuccess !== true && isFieldEmpty === true) && (
            <p className="error text-center" >Please fill every empty field</p>
          )}
          {(onSuccess !== true && isEmailValid === false) && (
            <p className="error text-center" >Please insert a valid email</p>
          )}
          {(onSuccess !== true && userExists === true) && (
            <p className="error text-center" >Username chosen already exists</p>
          )}
          {(type === 'login') && (
            <button
              className="submit-btn"
              onClick={submitLogin}>Log-in</button>
          )}
          {userNoMatch && (
            <p
              className="error text-center"
            >
              The credentials do not match any users!
            </p>
          )}
        </form>
      </div>
    </div>

  )
}

export default AccountForm;