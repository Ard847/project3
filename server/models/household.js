const orm = require('../config/orm');

const createHousehold = (usersId,houseName) => {
  orm.Household.create(
    {
      usersId:usersId,
      houseName:houseName
    }
  );
};

module.exports = {
  createHousehold,
}