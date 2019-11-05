const express = require('express');
const mongoose = require('mongoose');
const schema = mongoose.schema;
const content = require('./contents');
const reporter = require('./reporters');


const locationSchema = mongoose.Schema({
    name: String,
    locations: {
        type : {
            type: String,
            enum : ['point'],
            required : true
         },
         coordinates: {
             type: [Number],
             required : true
         }
    },
    content: [{type: mongoose.Schema.Types.ObjectId, ref: 'Content'}],
    reporter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reporter'}]


});

function validateLocation(location){
    const schema = Joi.object({
      name: Joi.string().max(100).required(),
      locations: Joi.string().required()
    })
    return Joi.validate(location, schema);
}

 const Location = mongoose.model('Location', locationSchema );

 exports.Location = Location;
 exports.validate = validateLocation;