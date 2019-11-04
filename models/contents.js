const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const location = require('./locations');
const reporter = require('./reporters');
const Joi = require('joi');

const contentSchema = mongoose.Schema({
    id : { type: String},
    title: {type: String},
    published_at: { type:Date, default: new Date()},
    news: { type: String},
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
    reporter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reporter'}]

});
function validateContent(content){
    const schema = Joi.object({
      title: Joi.string().max(100).required(),
      news: Joi.string().required(),
    })
    return Joi.validate(content, schema);
}


    const Content = mongoose.model('Content', contentSchema);

    exports.Content = Content;
    exports.validate = validateContent;