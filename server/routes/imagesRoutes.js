const cloudinary = require('cloudinary').v2
const express = require('express');
const router = express.Router();
const auth = require('../auth')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get('/:id',auth, async(req,res) => {
    const userHouseholds = await householdModel.findAllHousehold(req.params.id);
    const {resources} = await cloudinary.search.expression 
    ('folder:dev_setups')
    .sort_by('public_id')
    .execute();

    const publicIds = resources.map( file => file.public_id )
    res.sec(publicIds)
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
        res.json({msg : "Saved with success"})
    }catch(e){
        console.log(e)
        res.status(500).json({err : "Something went wrong"})
    }
})

module.exports = router

 