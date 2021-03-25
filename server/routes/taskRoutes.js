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

router.post('/createNew/:houseID', auth, async (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);

  const houseID = req.params.houseID;
  const taskName = req.body.name;
  const timings = req.body.timings;
  await tasksModel
    .createTask(houseID, taskName, timings)
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
    });
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
    });
});

router.put('/updateUser/:houseID', auth, async (req, res) => {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  const taskID = req.body.taskID;
  const houseID = req.params.houseID;
  const user = req.body.user;
  await tasksModel
    .updateUser(taskID, houseID, user)
    .then(async () => {
      if (user !== null) {
        await tasksModel
          .updateStatus(taskID, houseID, 'assigned')
          .then((put) => {
            console.log('if(user !== null) put =', put);
            res.json({
              message: 'success',
              data: put,
            });
          })
      } else if (user === null) {
        await tasksModel
          .updateStatus(taskID, houseID, 'to-do')
          .then((put) => {
            console.log('if(user === null) put =', put);
            res.json({
              message: 'success',
              data: put,
            });
          });
      }
    })
    .catch((err) => {
      res.status(401).json({
        message: 'error',
        data: err,
      });
    });
});

router.put('/updateAll/:houseID', auth, async (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);
  await tasksModel
    .updateTask(req.body, req.params.houseID)
    .then((put) => {
      console.log('put =', put);
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
    });
});

router.put('/updateCompletedDate/:houseID', auth, async (req, res) => {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  const houseID = req.params.houseID;
  // console.log({ houseID });
  const taskID = req.body.taskID;
  // console.log({ taskID });
  const completedDate = req.body.completedDate;
  // console.log({ completedDate });

  try {
    const put = await tasksModel.updateCompletedDate(taskID, houseID, completedDate)
      console.log('/updateCompletedDate/:houseID =', put);

    const task = await tasksModel.findTask(taskID);
    console.log('task =', task);

    const repeatEvery = task[0].repeatEvery;
    const date = new Date(completedDate);
    date.setDate(date.getDate() + Number(repeatEvery));
    console.log('date =', date); 

    const updateNextDate = await tasksModel.updateNextDate(taskID, houseID, date);
    console.log('updateNextDate =', updateNextDate);

    res.json({
      message: 'success',
      data: {
        put: put,
      },
    });

  } catch (err) {
    console.log('error =', err);
    res.status(401).json({
      message: 'error',
      data: err,
    });
  }

});

router.delete('/deleteTask/:houseID', auth, async (req, res) => {
  console.log('req.body =', req.body);
  console.log('req.params =', req.params);

  const houseID = req.params.houseID;
  const taskID = req.body.task.id;

  await tasksModel
    .deleteTask(taskID, houseID)
    .then((deleted) => {
      res.status(200).json({
        message: 'success',
        data: deleted,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'error',
        data: err,
      });
    });
});

module.exports = router;