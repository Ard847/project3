const { Task } = require('../config/orm');

const createTask = async (houseID, userID, taskName, times) =>{
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

module.exports = {
  createTask,
}