const orm = require('../config/orm');

const createTasks= (householdID,usersId,name,taskDescription,startDate,endDate,inPrgressBy,completedBy) =>{
  orm.HouseholdTasks.create(
    {
      householdID:householdID,
      usersId:usersId,
      userRealName:name,
      taskDescription:taskDescription,
      startDate:startDate,
      endDate:endDate,
      inPrgressBy:inPrgressBy,
      completedBy:completedBy
    }
  );
};

module.exports = {
  createTasks,
}