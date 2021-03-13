const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// required models
const userModel = require('../models/user');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.


//token authentication 
const auth = async (req, res, next) => {
  console.log("userRouters, auth function");
  const authHeader = req.headers['authorization'];
  console.log('authHeader =', authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.get('/authentication', auth, (req, res) => {
  console.log(' I am here at /api/test');
  res.json({ success: true })
})

router.get('/login', async (req, res) => {
  console.log('userRoutes.js, req.query=', req.query);
  const { username, email, password } = await req.query;

  const user = await userModel.findUser( email, username);
  console.log('user =', user);
  if (!user) return res.status(404).json({ message: 'user does not exist' });

  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (!isMatch) return res.status(401).json({ message: 'password incorrect' });

  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });

  res.json({ 
    message: 'success',
    token: token,
    user: user 
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

router.post('/createNew', async (req, res) => {
  console.log('userRoutes.js, req.body =', req.body);
  console.log(req.body.firstName)

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  await userModel
    .createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.username,
      hash
    )
    .then((post) => {
      res.json({
        message: 'success',
        data: post,
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    })
});



module.exports = router;