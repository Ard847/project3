const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// required models
const tasksModel = require('../models/tasks');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.

router.post('/createNew/:houseID/:userID', async (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);
  
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
  const userID = req.params.userID;
  const taskName = req.body.name;
  await tasksModel
    .createTask(houseID, userID, taskName, times)
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

module.exports = router ;