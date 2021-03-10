const getSession = (key) => {
  const sessionData = sessionStorage.getItem(key);
  return sessionData;
}

export default getSession;