const { Task } = require('../config/orm');

const createTask = async (houseID, taskName, times) => {
  return await Task.create({
    householdID: houseID,
    userID: null,
    taskName: taskName,
    completedDate: null,
    nextDate: null,
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
    console.log('task model, findAllTasks, error =', err);
  })
}

const findTask = async (taskID) => {
  return await Task.findAll({
    where: { id: taskID },
    raw: true,
  })
  .then((data) => {
    // console.log('findTask data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, findTask, error =', err);
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

const updateUser = async (taskID, houseID, user) => {
  return await Task.update({userID: user},{
    where: {
      id: taskID,
      householdID: houseID,
    },
  })
  .then((data) => {
    // console.log('updateUser data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, updateUser, error =', err);
  })
}

const updateTask = async (task, houseID) => {
  console.log('tasks, task =', task);
  return await Task.update({
    taskName: task.taskName,
    nextDate: Date.parse(task.nextDate),
    duration: task.duration,
    repeatEvery: task.repeatEvery,
    alertBefore: task.alertBefore,
    completeBy: task.completeBy,
    status: task.status,
  },{
    where: {
      id: task.id,
      householdID: houseID,
    },
  })
  .then((data) => {
    // console.log('updateTask data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, updateTask, error =', err);
  });
}

const updateNextDate = async (taskID, houseID, nextDate) => {
  return await Task.update({
    nextDate: nextDate,
  },{
    where: {
      id: taskID,
      householdID: houseID,
    },
  })
  .then((data) => {
    // console.log('updateTask data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, updateTask, error =', err);
  });
}

const updateCompletedDate = async (taskID, houseID, completedDate) => {
  return await Task.update({
    completedDate: completedDate,
  },{
    where: {
      id: taskID,
      householdID: houseID,
    },
  })
  .then((data) => {
    console.log('updateCompletedDate, data =', data);
    return data;
  })
  .catch((err) => {
    console.log('task model, updateCompletedDate, error =', err);
  })
}

const deleteTask = async (taskID, houseID) => {
  return await Task.destroy({
    where: {
      id: taskID,
      householdID: houseID,
    },
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
  createTask,
  findAllTasks,
  findTask,
  updateStatus,
  updateUser,
  updateTask,
  updateCompletedDate,
  updateNextDate,
  deleteTask,
}