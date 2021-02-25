const {validationResult, matchedData} = require('express-validator');
const axios = require('axios');
const mongoose = require('mongoose');
const CardModel = require('../models/Card');

exports.add = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.mapped()});
        return;
    }

    const newCard = new CardModel(matchedData(req));

    try{
        await newCard.save();
        res.status(201).json({
            status: "success",
            message: "Card created successfully!",
            card: newCard
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            error:error.message
        });
    }
}

exports.all = async (req, res) => {
    let cards = await CardModel.find();
    res.status(200).json({
        status:"success",
        cards
    });
}

exports.getSlug = async (req, res) => {
    let slug = req.params.slug;
    if(!slug){
        res.status(400).json({
            status: "error",
            error:"Card slug cannot be empty!"
        });
        return;
    }

    let card = await CardModel.findOne({slug});

    if(!card){
        res.status(200).json({
            status: "success",
            error:"No cards found with this slug"
        });
        return;
    }

    res.status(200).json({
        status:"success",
        card
    });
}

exports.getFuzzyCard = async (req, res) => {
    let name = req.params.name;
    
    await axios.get('https://api.scryfall.com/cards/named?fuzzy='+name)
    .then(function (response) {
        // handle success
        if(response.status == 200){
            res.json(response.data);
        }
    })
    .catch(function (error) {
        // handle error
        res.json({
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data
        });
    })
}

exports.getTextCard = async (req, res) => {
    let text = req.params.text;
    
    await axios.get('https://api.scryfall.com/cards/search?q=o:'+text)
    .then(function (response) {
        // handle success
        if(response.status == 200){
            res.json(response.data);
        }
    })
    .catch(function (error) {
        // handle error
        res.json({
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data
        });
    })
}