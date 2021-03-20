const cloudinary = require('cloudinary').v2
const express = require('express');
const router = express.Router();
const auth = require('../auth')
const householdModel = require('../models/household');
const orm = require('../config/orm')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get('/:id',auth, async(req,res) => {
    const userHouseholds = await householdModel.findAllHousehold(req.params.id);
    const households = userHouseholds[0].dataValues.households; 
    console.log('yo',households)
    const images =  households.map( (household) => household.dataValues.image)
    const {resources} = await cloudinary.search.expression 
    ('folder:project3/houses')
    .sort_by('public_id')
    .execute();
    const publicIds = resources.map( file => file.public_id ) 
    console.log('public',publicIds)
    console.log('images',images)
    const imagesToSend = images.filter((image,n) => image === publicIds[n])
    console.log('imagest to send' ,imagesToSend)
    //res.sec(publicIds)
    res.json({Answer : 'Hey'})
})

router.post('/upload',auth,  async (req,res) => {
    try{
        const fileStr = req.body.data
        //console.log(fileStr)
         const uploadRespose = await cloudinary.uploader.upload(fileStr, {
            use_filename : true,
            folder : "project3/houses"
        }) 
        console.log(uploadRespose)  
        uploadRespose.public_id// to be stored in the database
       // const h
        //await orm.Household.update({image : uploadRespose.public_id},{where:{ id : req.params.id}});
        res.json({msg : "Saved with success"})
    }catch(e){
        console.log(e)
        res.status(500).json({err : "Something went wrong"})
    }
})

module.exports = router

 