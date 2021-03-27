const getSession = (key) => {
  const sessionData = sessionStorage.getItem(key);
  if(key ==='id'){
    return parseInt(sessionData);
    
  } else {
    // console.log('sessionData', sessionData);
    return sessionData;

  }
}

export default getSession;