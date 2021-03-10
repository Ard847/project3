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
    startDate: { type: DataTypes.STRING(50) },
    endDate: { type: DataTypes.STRING(50) },
    inPrgressBy: { type: DataTypes.STRING(50) },
    completedBy: { type: DataTypes.STRING(50) }
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

HouseholdMember.belongsTo(User, {
  forgeignKey: 'userID',
  targetKey: 'id',
  as: 'user'
});
HouseholdMember.belongsTo(Household, {
  foreignKey: 'householdID',
  targetKey: 'id',
  as: 'household',
});

Household.belongsToMany(User, { through: HouseholdMember, foreignKey: 'householdID' });

User.belongsToMany(Household, { through: HouseholdMember, foreignKey: 'userID' });

module.exports = {
  User,
  Household,
  Task,
  HouseholdMember,
};