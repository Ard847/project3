const orm = require('../config/orm');


const createUsers =(email,userName,name,password) => {
  orm.Users.create({Email:email,userName:userName,userRealName:name,userPassword:password});
};

const createHousehold = (usersId,houseName,membersName) => {
  orm.Household.create({usersId:usersId,houseName:houseName,membersName:membersName});
};

const createHouseholdTasks= (householdID,usersId,name,taskDescription,startDate,endDate,inPrgressBy,completedBy) =>{
  orm.HouseholdTasks.create({householdID:householdID,usersId:usersId,userRealName:name,taskDescription:taskDescription,
    startDate:startDate,endDate:endDate,inPrgressBy:inPrgressBy,completedBy:completedBy});
};

const createUserTasks = (householdTaskID,usersId,name,allTasks,completed,inProgress,taskDescription,startDate,endDate) =>{
  orm.UserTasks.create({householdTaskID:householdTaskID,usersId:usersId,userRealName:name,allTasks:allTasks,completed:completed,
                        inProgress:inProgress,taskDescription:taskDescription,startDate:startDate,endDate:endDate});
};

module.exports = {
  createUsers,
  createHousehold,
  createHouseholdTasks,
  createUserTasks
};