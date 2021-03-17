const { Task } = require('../config/orm');

const createTask = async (houseID, userID, taskName, times) => {
  return await Task.create({
    householdID: houseID,
    userID: userID,
    taskName: taskName,
    completedDate: '',
    nextDate: '',
    duration: times.duration,
    repeatEvery: times.repeat,
    alertBefore: times.alert,
    completeBy: times.complete,
    status: 'to-do',
  })
  .then((data) => {
    // console.log('createTask data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, createTask, error =', err);
  })
}

const findAllTasks = async (houseID) => {
  return await Task.findAll({
    where: { householdID: houseID },
    raw: true,
  })
  .then((data) => {
    // console.log('findAllTasks data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, findAllTask, error =', err);
  })
}

const updateStatus = async (taskID, houseID, newStatus) => {
  return await Task.update({status: newStatus},{
    where: {
      id: taskID,
      householdID: houseID,
    }
  })
  .then((data) => {
    // console.log('updateStatus data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, updateStatus, error =', err);
  })
}

module.exports = {
  createTask,
  findAllTasks,
  updateStatus,
}