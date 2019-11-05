const express = require('express');
const router = express.Router();
const {Content, validate} = require('../models/contents');
const joi = require('joi');


//create news
router.post('/create', async (req,res) =>{
    const{error} = validate(req.body)
    if (error) return res.status(400).json(error.details[0].message);

     const content = new Content({
        title: req.body.title,
        news: req.body.news
        })
        await content.save();
        res.json(content);
   

});

//get news by id
router.get('/:id', async (req,res)=>{
    try{
        const content = await Content.findOne({ _id: req.params.id });
        res.json(content);
    } catch(error){
        res.status(400).json('cant get news');
    }
});

// get all news
router.get('/', async (req,res)=>{
    try{
        const content = await Content.find();
        res.json(content);
    } catch(error){
        res.status(400).json('cant get news');
    }
});

//deleting news by id
router.delete('/:id', async(req,res) =>{
    try{
        const content = await content.findByIdAndRemove({ _id: req.params.id});
        res.json('content removed');
    }catch (error){
        res.status(400).json('could not delete');
    }
})

//updating news by id
router.put('/:id', async(req,res)=>{
    try{
        const content = await Content.findOne({_id:req.params.id});
        if (!content) res.status(400).json('content not found');

        const {error} = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        content.title = req.body.title;
        content.news = req.body.news;
        res.json(content);
        }
        catch(error){
            res.status(400).json('can not update');
        }
    })
module.exports = router;
