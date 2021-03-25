const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//token authentication 
const auth = require('../auth');

// required models
const userModel = require('../models/user');


router.get('/authentication', auth, (req, res) => {
  res.json({ success: true });
});

router.post('/login', async (req, res) => {
  // console.log('userRoutes.js, req.body=', req.body);
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findUser(email, username);
    // console.log('user =', user);
    if (!user) return res.status(404).json({ message: 'user does not exist' });
  
    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) return res.status(401).json({ message: 'password incorrect' });
  
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
  
    res.json({
      message: 'success',
      token: token,
      user: user,
    });
    
  } catch (error) {
    console.log('/login =', error);

    res.status(400).json({
      message: 'error',
      data: error,
    });
  }
});

router.get('/getusers/:houseID', auth, async (req, res) => {
  try {
    const householdMembers = await userModel
      .findAllUser(req.params.houseID);
    const members = householdMembers[0].dataValues.users;

    res.send(members);

  } catch (error) {
    console.log('/getusers/:houseID =', error);

    res.status(400).json({
      message: 'error',
      data: error,
    });
  }
});

router.post('/createNew', async (req, res) => {
  // console.log('userRoutes.js, req.body =', req.body);
  // console.log(req.body.lastName);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const post = await userModel.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.username,
      hash,
      req.body.color,
    )
    if(post === undefined){
      res.status(401).json({
        message: 'error',
      });
    }
    res.json({
        message: 'success',
        data: post,
    });
});



module.exports = router;