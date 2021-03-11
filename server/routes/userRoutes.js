const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// required models
const userModel = require('../models/user');
const orm = require('../config/orm')

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.


router.post('/login', async (req, res) => { 
  console.log('userRoutes.js, req.query =', req.body);
  const {username,email,password} = await req.body
 
  const user = await orm.User.findOne({where : {username:username}, raw : true})
  if (!user) return res.status(404).json({ message: 'user does not exist' });
 
  const isMatch = await bcrypt.compare( password,user.userPassword);
  if (!isMatch) return res.status(401).json({ message: 'password incorrect' }); 
 
/*   res.json({token,user:{
     
    username : user.username,
}})  */
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
  /* console.log("here")
  console.log('userRoutes.js, req.body =', req.body);
  console.log(req.body.firstName) */
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