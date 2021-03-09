const { User } = require('../config/orm');

const createUser = async (firstName, lastName, email, username, password) => {
  return await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      userPassword: password,
    })
  .then((create) => {
    return create;
  })
  .catch((err) => console.log('user.js model, error =', err));
};

const findUser = async (email, username, password) => {
  // console.log({email});
  // console.log({username});
  // console.log({password});
  return await User.findOne({
    where: {
      email: email,
      username: username,
      userPassword: password,
    },
    raw: true,
  })
  .then((data) => {
    console.log('data =', data);
    return {user: data};
  })
  .catch((err) => {
    console.log('user model, findUser, error =', err);
  })
}


module.exports = {
  createUser,
  findUser,
};