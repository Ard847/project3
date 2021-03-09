const express = require('express');
const router = express.Router();

// required models
const userModel = require('../models/user');

// WE NEED TO INCLUDE ERROR HANDELING, 
// FEEDBACK FOR LAST PROJECT WAS WE WERE MARKED DOWN FOR NOT HAVING IT.

router.get('/result', async function(req, res) {
  console.log("userRoute.js")
  // await userModel
  //   .findAll({/* {where:{sessionId:userId} */raw : true})
  //   .then((user) => {
  //     console.log('userRoute.js, user =', user);
  //     res.send({Answer : user});
  //   })
  //   .catch((err) => {
  //     console.log('useRoutes.js, error =', err);
  //   });
});

module.exports = router;
