const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

// required models
const tasksModel = require('../models/tasks');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.

router.get('/getTasks/:houseID', auth, async (req, res) => {
  await tasksModel
    .findAllTasks(req.params.houseID)
    .then((get) => {
      res.status(200).json({
        message: 'success',
        data: get,
      })
    })
    .catch((err) => {
      res.json({
        message: 'error',
        data: err,
      })
    })
});

router.post('/createNew/:houseID', async (req, res) => {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  
  let times = {
    duration:'',
    repeat:'',
    alert:'',
    complete:'',
  }
  switch(req.body.duration.unit){
    case 'mins':
      times.duration = req.body.duration.time * 1;
      break;
    case 'hours':
      times.duration = req.body.duration.time * 60;
      break;
  }
  switch(req.body.repeat.unit){
    case 'days':
      times.repeat = req.body.repeat.time * 1;
      break;
    case 'weeks':
      times.repeat = req.body.repeat.time * 7;
      break;
      case 'months':
      times.repeat = req.body.repeat.time * 60;
      break;
  }
  switch(req.body.alert.unit){
    case 'days':
      times.alert = req.body.alert.time * 1;
      break;
    case 'weeks':
      times.alert = req.body.alert.time * 7;
      break;
      case 'months':
      times.alert = req.body.alert.time * 60;
      break;
  }
  switch(req.body.complete.unit){
    case 'days':
      times.complete = req.body.complete.time * 1;
      break;
    case 'weeks':
      times.complete = req.body.complete.time * 7;
      break;
  }
  // console.log('times =', times);

  const houseID = req.params.houseID;
  const taskName = req.body.name;
  await tasksModel
    .createTask(houseID, taskName, times)
    .then((post) => {
      // console.log('post =', post);
      res.json({
        message: 'success',
        data: post,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'error',
        data: err,
      });
    })
});

router.put('/updateStatus/:houseID', auth, async (req, res) => {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  const taskID = req.body.taskID;
  const houseID = req.params.houseID;
  const newStatus = req.body.newStatus;
  await tasksModel
    .updateStatus(taskID, houseID, newStatus)
    .then((put) => {
      // console.log('put =', put);
      res.json({
        message: 'success',
        data: put,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'error',
        data: err,
      });
    })
});

module.exports = router ;