const { Sequelize } = require('sequelize');
const {connection,DataTypes} = require('./db');

const Users = connection.define('User', {
  id       :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  Email    :{type: DataTypes.STRING(50)},
  userName :{type: DataTypes.STRING(50)},
  userRealName :{type: DataTypes.STRING(50)},
  userPassword  :{type: DataTypes.STRING(255)}
},{
  timestamps : false,
});

const Household = connection.define('houseHold', {
  id       :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true }, //change that cause house hold not unique
  usersId      :{type: DataTypes.INTEGER},
  houseName    :{type: DataTypes.STRING(50)},
  membersName  :{type:DataTypes.INTEGER }
},{
  timestamps : false,
});

const HouseholdTasks = connection.define('householdTasks', {
  id              :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  householdID     :{type: DataTypes.INTEGER},
  usersId         :{type:DataTypes.INTEGER },
  userRealName    :{type: DataTypes.STRING(50)},
  taskDescription :{type:DataTypes.STRING(50)},
  startDate       :{type:DataTypes.STRING(50)},
  endDate         :{type:DataTypes.STRING(50)},
  inPrgressBy     :{type:DataTypes.STRING(50)},
  completedBy     :{type:DataTypes.STRING(50)}
},{
  timestamps : false,
});

const UserTasks = connection.define('userTasks', {
    id              :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    householdTaskID :{type: DataTypes.INTEGER},
    usersId         :{type:DataTypes.INTEGER },
    userRealName    :{type: DataTypes.STRING(50)},
    allTasks        :{type:DataTypes.STRING(50)},
    completed       :{type:DataTypes.STRING(50)},
    inProgress      :{type:DataTypes.STRING(50)},
    taskDescription :{type:DataTypes.STRING(50)},
    startDate       :{type:DataTypes.STRING(50)},
    endDate         :{type:DataTypes.STRING(50)}
  },{
    timestamps : false,
  });
  
module.exports = {
  Users,
  Household,
  HouseholdTasks,
  UserTasks
};