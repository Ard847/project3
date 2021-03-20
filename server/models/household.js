const { User, Household, HouseholdMember } = require('../config/orm');


const createHousehold = async (name) => {
  return await Household.create(
    {
      houseName: name,
    }
  )
  .then((create) => {
    return create;
  })
  .catch((err) => console.log('household.js model, createHousehold, error =', err));
};

const addNewMember = async (houseID, userID ) => {
  return await HouseholdMember.create(
    {
      householdID: houseID,
      userID: userID,
    }
  )
  .then((create) => {
    return create;
  })
  .catch((err) => console.log('household.js model, addNewMember, error =', err));
}

const findHousehold = async (houseID) => {
  return await Household.findOne({
    where: {
      id: houseID
    },
    raw: true,
  })
  .then((data) => {
    // console.log('findHousehold data =', data);
    return data;
  })
  .catch((err) => {
    console.log('household model, findHousehold, error =', err);
  })
}

const findAllHousehold = async (userID) => {
  // console.log('findAllHouseholds, userID =', userID);
  return await User.findAll({
    where: {id: userID},
    attributes: ['id', 'firstName', 'lastName'],
    include: [{
      model: Household, 
      attributes: ['id', 'houseName'],
    }]
  })
  .then((data) => {
    // console.log('findAllHousehold data =', data);
    return data;
  })
  .catch((err) => {
    console.log('household model, findAllHousehold, error =', err);
  })
}


const deleteMember = async (userID, houseID ) => {
  return await HouseholdMember.destroy({
    where: {
      userID: userID,
      householdID: houseID,
    }
  })
  .then((data) => {
    // console.log('deleteTask, data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, deleteTask, error =', err);
  })
}

module.exports = {
  createHousehold,
  addNewMember,
  findHousehold,
  findAllHousehold,
  deleteMember,
};