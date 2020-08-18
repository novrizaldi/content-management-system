var express = require('express');
var router = express.Router();
var Datadate = require('../models/datadate');

//=============BROWSE=======================
router.post('/search', function (req, res) {
    let { letter , frequency } = req.body
    let reg = new RegExp (letter, 'i')
    let response = []
    let filter = {}

    if ( letter && frequency) {
        filter.letter = { $regex : reg}
        filter.frequency = frequency ;
    } else if (letter) {
        filter.letter = {$regex : reg}
    } else if (frequency) {
        filter.frequency = frequency;
    }

    Datadate.find(filter)
    .then(data => {
        response = data.map(item => {
            return {
                _id : item._id,
                letter : item.letter,
                frequency : item.frequency
            }
        })
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(401).json(err)
    })

})


//=================GET=================
router.get('/', function (req, res) {
    let response = []

    Datadate.find({})
        .then(data => {
            response = data.map(item => {
                return {
                    _id: item._id,
                    letter: item.letter,
                    frequency: item.frequency
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//===========ADD=============

router.post('/', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {},
    }

    Datadate.create({
            letter: req.body.letter,
            frequency: req.body.frequency
        })
        .then(data => {
            response.success = true
            response.message = "data have been added"
            response.data._id = data.id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        }).catch(err => {
            res.status(500).json({
                response
            })
        })
})

//===============DELETE==================
router.delete('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {},
    }

    Datadate.findByIdAndRemove(req.params.id)
        .then(data => {
            response.success = true
            response.message = "data have been daleted"
            response.message = req.params.id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//===============PUT=================

router.put('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }
    let id = req.params.id

    Datadate.findByIdAndUpdate(id, {
        letter: req.body.letter,
        frequency: req.body.frequency
    }, {
        new: true
    }).then(data => {
        response.message = "data have been updated"
        response.success = true
        response.data.id = req.params.id
        response.data.letter = data.letter
        response.data.frequency = data.frequency
        res.status(201).json(response)
    }).catch((err) => {
        res.json(err)
    })
})

//================FIND BY ID===============

router.delete('/:id', function (req, res, next) {
    let response = {
        success : false,
        message : "",
        data :{}
    }
    let id = req.params.id

    Datadate.findById(id)
    .then(data => {
        response.success = true
        response.message = "data found"
        response.data.id = id
        response.data.letter = data.letter
        response.data.frequency = data .frequency
        res.status(201).json(response)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router;