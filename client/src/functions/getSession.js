const getSession = (key) => {
  const sessionData = sessionStorage.getItem(key);
  console.log('sessionData', sessionData);
  return sessionData;
}

export default getSession;