// packages
import React, { useEffect, useState } from 'react';

// styles
import './AccountForm.css';


const AccountForm = ({ type, onCreate, onSubmit, onSuccess }) => {

  // console.log('AccountForm.js, type =', type);

  const [fNameInput, setFNameInput] = useState('');
  const [lNameInput, setLNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [passwordNoMatch, setPasswordNoMatch] = useState(false);

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
      }
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
    // console.log('AccountForm, submitLogin, user =', user);
    onSubmit(user);
  }

  // console.log('onSuccess =', onSuccess);
  

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
            id='last-name'
            type='text'
            placeholder='Enter your Last name.'
            onChange={lNameInputChange}
          />
        </>)
      }
      { (type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            placeholder='Enter Email'
            onChange={emailInputChange}
          />
        </>
      )}
      { (type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            placeholder='Enter Username'
            onChange={usernameInputChange}
          />
        </>
      )}
      { (type === 'create-account' || type === 'login') && (
        <>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            placeholder='Enter Password'
            onChange={passwordInputChange}
          />
        </>
      )}
      { (type === 'create-account') && (
        <>
          <label htmlFor='confirm-password'>Confirm Password:</label>
          <input
            id='confirm-password'
            type='password'
            placeholder='Please confirm your password'
            onChange={confirmInputChange}
          />
        </>)
      }
      { (type === 'create-account' && onSuccess !== true) && (
        <button onClick={submitCreate}>Create Account</button>
      )}
      { (type === 'create-account' && onSuccess === true) && (
        <p>User was successfully created. go to Log In page to use the application.</p>
      )}
      { (passwordNoMatch && onSuccess === false) && (
        <p>Your passwords do not match</p>
      )}
      { (type === 'login') && (
        <button onClick={submitLogin}>Log-in</button>
      )}
    </form>
  )
}

export default AccountForm;