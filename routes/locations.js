const express = require('express');
const router = express.Router();
const {Location, validate} = require('../models/locations');
const joi = require('joi');


//register a reporter
router.post('/register', async (req,res) =>{
    const{error} = validate(req.body)
    if (error) return res.status(400).json(error.details[0].message);

     const location = new Location({
        name: req.body.name,
        location: req.body.location
        })
        await location.save();
        res.json(location);
   

});

//get a specific reporter
router.get('/:id', async (req,res)=>{
    try{
        const location = await location.findOne({ _id: req.params.id });
        res.json(location);
    } catch(error){
        res.status(400).json('cant get location');
    }
});

//update a specific reporter
router.put('/:id', async(req,res)=>{
    try{
        const location = await Location.findOne({_id:req.params.id});
        if (!location) res.status(400).json('location not found');

        const {error} = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        location.name = req.body.name;
        location.locations = req.body.location;
        res.json(content);
        }
        catch(error){
            res.status(400).json('can not update');
        }
    })

module.exports = router;