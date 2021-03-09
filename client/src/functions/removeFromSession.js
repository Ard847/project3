const removeFromSession = (key) => {

  sessionStorage.removeItem(key);
}

export default removeFromSession;