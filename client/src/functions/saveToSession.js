const saveToSession = (key, value) => {
  console.log('saveToSession Key, value =', key, value);
  sessionStorage.setItem(`${key}`, JSON.stringify(value));
}

export default saveToSession;