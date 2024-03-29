const config = require('../config');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const reporter = require('./reporter');
const content = require('./contents');
const {Reporter} = require('../models/reporters');


router.post('/login', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    let reporter = await Reporter.findOne({email:req.body.email});
    if (!reporter)  return res.status(400).json('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, reporter.password);
    if (!validPassword) return res.status(400).json('Invalid email or password');

    const token = Jwt.sign({_id: reporter._id}, config.jwtPrivateKey);
    res.send(token);
});


function validate(req){
    const schema = Joi.object({ 
          email: Joi.string().min(7).max(20).required().email(),
          password: Joi.string().min(5).max(1024).required()
          });
     return Joi.validate(req, schema);
      }

      module.exports = router;