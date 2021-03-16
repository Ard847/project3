const { DataTypes } = require('sequelize');
const connection = require('./db');

const User = connection.define('user',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING(50) },
    lastName: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(50), allowNull: false },
    username: { type: DataTypes.STRING(50), allowNull: false },
    userPassword: { type: DataTypes.STRING(255), allowNull: false }
  },
  {
    timestamps: false,
  }
);

const Household = connection.define('household',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    houseName: { type: DataTypes.STRING(50) },
  },
  {
    timestamps: false,
  }
);

const Task = connection.define('tasks',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    householdID: { type: DataTypes.INTEGER },
    userID: { type: DataTypes.INTEGER, allowNull: true, },
    taskName: { type: DataTypes.STRING(50) },
    completedDate: { type: DataTypes.STRING(50) },
    nextDate: { type: DataTypes.STRING(50) },
    duration: { type: DataTypes.INTEGER },
    repeatEvery: { type: DataTypes.STRING(50) },
    alertBefore: { type: DataTypes.STRING(50) },
    completeBy: { type: DataTypes.STRING(50) },
    status: { type: DataTypes.STRING(50) },
  },
  {
    timestamps: false,
  }
);

const HouseholdMember = connection.define('householdMember',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    householdID: {
      // ref outfit ID
      type: DataTypes.INTEGER,

      primaryKey: false,
      references: {
        model: 'household',
        key: 'id',
      },
    },
    userID: {
      // ref item ID
      type: DataTypes.INTEGER,

      primaryKey: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

Task.belongsTo(Household, { foreignKey: 'householdID' });
Task.belongsTo(User, { foreignKey: 'userID' });

// HouseholdMember.belongsTo(User, {
//   forgeignKey: 'userID',
//   targetKey: 'id',
//   as: 'user'
// });
// HouseholdMember.belongsTo(Household, {
//   foreignKey: 'householdID',
//   targetKey: 'id',
//   as: 'household',
// });

User.belongsToMany(Household, { through: HouseholdMember, foreignKey: 'userID' });
Household.belongsToMany(User, { through: HouseholdMember, foreignKey: 'householdID' });


module.exports = {
  User,
  Household,
  Task,
  HouseholdMember,
};