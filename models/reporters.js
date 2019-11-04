const express = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.schema;
const content = require('./contents');
const location = require('./locations');
const Joi = require('joi');


const reporterSchema = mongoose.Schema({
    id: {type : String},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
    content: [{type: mongoose.Schema.Types.ObjectId, ref: 'Content'}]
});

function validateReporter(reporter){
    const schema = Joi.object({
      name: Joi.string().max(100).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(4).required(),  
    })
    return Joi.validate(reporter, schema);
}

const Reporter = mongoose.model('Reporter', reporterSchema);

exports.Reporter = Reporter;
exports.validate = validateReporter;