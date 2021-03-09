const saveToSession = (key, value) => {
  // console.log('LoginPage, saveToStorage =', id);
  sessionStorage.setItem(`${key}`, JSON.stringify(value));
}

export default saveToSession;