const { User, Household } = require('../config/orm');

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

const findUser = async (email, username) => {
  // console.log({email});
  // console.log({username});
  // console.log({password});
  return await User.findOne({
    where: {
      email: email,
      username: username,
    },
    raw: true,
  })
  .then((data) => {
    // console.log('findUser data =', data);
    return data;
  })
  .catch((err) => {
    console.log('user model, findUser, error =', err);
  })
}

const findAllUser = async (houseID) => {
  // console.log('findAllUser, houseID =', houseID);
  return await Household.findAll({
    where: {id: houseID},
    attributes: ['id', 'houseName'],
    include: [{
      model: User, 
      attributes: ['id', 'firstName', 'lastName'],
    }]
  })
  .then((data) => {
    // console.log('findAllUser data =', data);
    return data;
  })
  .catch((err) => {
    console.log('household model, findAllUser, error =', err);
  });

}



module.exports = {
  createUser,
  findUser,
  findAllUser,
};