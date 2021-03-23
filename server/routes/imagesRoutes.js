const cloudinary = require('cloudinary').v2
const express = require('express');
const router = express.Router();
const auth = require('../auth');
const orm = require('../config/orm')

// required models
const householdModel = require('../models/household');
const userModel = require('../models/user');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/houseHold/:id', auth, async (req, res) => {
  //console.log('here')
  const userHouseholds = await householdModel.findAllHousehold(req.params.id);
  const households = userHouseholds[0].dataValues.households;
  //console.log('yo',households)
  const images = households.map((household) => household.dataValues.image)
  const { resources } = await cloudinary.search.expression
    ('folder:project3/houses')
    .sort_by('public_id')
    .execute();
  const publicIds = resources.map(file => file.public_id)
  //console.log('public',publicIds)
  //console.log('images',images)
  let imagesToSend = []
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < publicIds.length; j++) {
      if (images[i] === publicIds[j] || images[i] === null) {
        imagesToSend.push(images[i])
      }
    }
  }

  // console.log('image to send' ,imagesToSend)
  res.send(imagesToSend)
});

router.get('/user/:houseID&:id', auth, async (req, res) => {
  const householdMembers = await userModel.findAllUser(req.params.houseID);
  const members = householdMembers[0].dataValues.users;
  //console.log('Users', members)
  const membersID = members.map((memb) => memb.dataValues.id)
  //console.log(membersID)
  const users = []
  for (let i = 0; i < membersID.length; i++) {
    users.push(await orm.User.findOne({ where: { id: membersID[i] } }))
  }
  const images = users.map((user) => user.dataValues.image)
  const currentUser = await orm.User.findOne({ where: { id: req.params.id } }, { raw: true });
  //console.log('current',currentUser)
  res.send({ images, currentUser: currentUser.image })
});

router.post('/upload/user', auth, async (req, res) => {
  
  try {
    const fileStr = req.body.data
    //console.log(fileStr)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      use_filename: true,
      folder: "project3/users"
    })
    //console.log(uploadResponse) 
    await orm.User.update({ image: uploadResponse.public_id }, { where: { id: req.body.id } });
    //console.log('uploaded',req.body.id)
    res.json({ msg: "Saved with success" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ err: "Something went wrong" })
  }
});

router.put('/upload/house', auth, async (req, res) => {
  console.log('req.body.id =', req.body.id);
  try {
    const fileStr = req.body.data;
    //console.log(fileStr)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      use_filename: true,
      folder: "project3/houses",
    });
    console.log(uploadResponse);
    await householdModel.uploadImage(uploadResponse.public_id, req.body.id);
    
    res.json({ message: "Saved with success" });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ err: "Something went wrong" });
  }
});



module.exports = router

