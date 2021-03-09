const orm = require('../config/orm');

const createUser = (firstName, lastName, email, username, password) => {
  orm.User.create(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      userPassword: password,
    }
  )
  .catch((err) => console.log('user.js model, error =', err));
};


module.exports = {
  createUser,
};