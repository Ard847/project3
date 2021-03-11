const express = require('express');
const router = express.Router();

// required models
const householdModel = require('../models/household');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.


router.get('/gethousehold/:id', async (req, res) => {
  const userHouseholds = await householdModel
    .findAllHousehold(req.params.id);
    // console.log('userHouseholds =', userHouseholds);
    // console.log('userHouseholds =', userHouseholds[0].dataValues);
  const households = userHouseholds[0].dataValues.households;
  res.send(households);
});

router.post('/createNew/:id', async (req, res) => {
  console.log('householdRoutes, req.body =', req.body);
  console.log('householdRoutes, req.params =', req.params);

  const household = await householdModel.createHousehold(req.body.name);
  // console.log('household =', household.dataValues);
  const householdMember = await householdModel.addNewMember(household.dataValues.id, req.params.id);
  // console.log('householdMember =', householdMember);
  const response = {
    memberID: householdMember.dataValues.id,
    householdID: householdMember.dataValues.householdID,
    userID: householdMember.dataValues.userID,
    houseName: household.dataValues.houseName,
  };
  res.send(response);
});

router.post('/join/:id', async (req, res) => {
  console.log('householdRoutes, req.body =', req.body);
  console.log('householdRoutes, req.params =', req.params);

  const household = await householdModel.findHousehold(req.body.householdID);
  // console.log('household =', household);
  const householdMember = await householdModel.addNewMember(req.body.householdID, req.params.id);
  // console.log('householdMember =', householdMember);
  const response = {
    memberID: householdMember.dataValues.id,
    householdID: householdMember.dataValues.householdID,
    userID: householdMember.dataValues.userID,
    houseName: household.houseName,
  }
  res.send(response);
});

module.exports = router;