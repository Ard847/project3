// packages
import React, { useContext, useState } from 'react';

// styles
import './SignupPage.css';

// context
import LoggedInContext from '../../context/LoggedInContext';

// components
import AccountForm from '../../components/forms/AccountForm';
import SignUpTitles from '../welcomeTitles/SignUpTitle';

// functions
import fetcher from '../../functions/fetcher';


const SignupPage = () => {

  const { loggedIn, userLoggedOut } = useContext(LoggedInContext);

  const [isFieldEmpty,setisFieldEmpty] = useState(false);
  const [isEmailValid,setIsEmailValid] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  const handleCreate = async (user) => {
    const url = '/api/user/createNew';
    //console.log(user)
    if(user.firstName  === ""|| user.lastName === ""|| user.username === "" || user.email === "" || user.password === "" )return setisFieldEmpty(true);
    setisFieldEmpty(false);
    const email = ValidateEmail(user.email)
    //console.log(email)
    // const createUserResponse = 
    if(email === false) return setIsEmailValid(false)
    setIsEmailValid(true)
    const createUserResponse = await fetcher(url, 'POST', user);
    console.log('createUserResponse =', createUserResponse);
    if (createUserResponse.message === 'success') {
      setUserCreated(true);
    }
  }

const ValidateEmail = (mail) =>{
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(mailFormat))return (true)
  return (false)
}

  if (loggedIn === false) {

    return (
      <>
        <SignUpTitles />
        <section>
          <article id='login-content'>
            <AccountForm type={'create-account'} onCreate={handleCreate} onSuccess={userCreated} isFieldEmpty = {isFieldEmpty} isEmailValid = {isEmailValid}/>
          </article>
        </section>
      </>

    )

  } else if (loggedIn === true) {

    return (
      <>
        <SignUpTitles />
        <section>
          <article id='login-content'>
            <h1>Sign Up Page</h1>
            <p>You are currently logged in to an account. To Create a new User please log out first. </p>
            <button onClick={userLoggedOut}>Log Out</button>
          </article>
        </section>
      </>

    )

  }
}

export default SignupPage;