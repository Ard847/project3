const express = require('express');
const router = express.Router();

// required models
const userModel = require('../models/user');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.


router.get('/findOne', async (req, res) => { 
  // console.log('userRoutes.js, req.query =', req.query);
  await userModel
    .findUser(req.query.email, req.query.username, req.query.password)
    .then((get) => {
      // console.log('userRoutes, findUser, get =', get);
      res.send(get);
    })
    .catch((err) => {
      res.status(401).json(err);
    })
});

router.get('/getusers/:houseID', async (req, res) => {
  const householdMembers = await userModel
    .findAllUser(req.params.houseID);
    console.log('householdMembers =', householdMembers);
    // console.log('householdMembers =', householdMembers[0].dataValues);
  const members = householdMembers[0].dataValues.users;
  res.send(members);
});

router.post('/createNew', async ( req, res ) => {
  // console.log('userRoutes.js, req.body =', req.body);
  await userModel
    .createUser(
      req.body.firstName, 
      req.body.lastName, 
      req.body.email, 
      req.body.username, 
      req.body.password
    )
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(401).json(err);
    })
});

router.get('/test', (req, res) => {
  console.log(' I am here at /api/test');
  res.json({hello: "THIS IS THE SERVER ENDPOINT"})
})

module.exports = router;