const express = require('express');
const router = express.Router();
const {Reporter, validate} = require('../models/reporters');
const joi = require('joi');
const Jwt = require('Jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');



router.post('/create', async (req,res) =>{
    const{error} = validate(req.body)
    if (error) return res.status(400).json(error.details[0].message);

     const reporter = new Reporter(req.body)
     const salt =  await bcrypt.genSalt(10);
        reporter.password = await bcrypt.hash(reporter.password, salt);
        await reporter.save();
        res.json(reporter);

        const token =  await Jwt.sign({_id: reporter._id}, config.jwtPrivateKey);
        try{
        res.header('x-auth-token', token)
        res.send({data: _.pick(reporter,['id','name','email'])});
        }
        catch (ex) {
            res.status(500).json('something failed');
        }
   });


   router.get('/:id', async (req,res)=>{
      try{
        const reporter = await Reporter.findOne({ _id: req.params.id });
        res.json(reporter);
    } catch(error){
        res.status(400).json('cant get reporter');
    }
    
  });

  router.get('/', async (req,res)=>{
    try{
      const reporter = await Reporter.find();
      res.json(reporter);
  } catch(error){
      res.status(400).json('cant get reporter');
  }
  
});


   router.put('/:id', async(req,res)=>{
    try{
        const reporter = await Reporter.find(c => c.id === parseInt(req.params.id));
        if (!reporter) res.status(400).json('reporter not found');

        const {error} = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        reporter.name = req.body.name;
        reporter.email = req.body.email;
        res.json(reporter);
        }
        catch(error){
            res.status(400).json('can not update');
        }
    });
    module.exports = router;
