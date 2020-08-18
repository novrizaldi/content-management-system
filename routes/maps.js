var express = require('express');
var router = express.Router();
var Maps = require('../models/maps');

//==============GET==================
router.get('/', function (req, res) {
    let response = []

    Maps.find({})
        .then(data => {
            response = data.map(item => {
                return {
                    _id: item.id,
                    title: item.title,
                    lat: item.lat,
                    lng: item.lng
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                response
            })
        })
})

//==================ADD=====================
router.post('/', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }

    Maps.create({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    }).then(data => {
        response.success = true
        response.message = "data have been added"
        response.data._id = data.id
        response.data.title = data.title
        response.data.lat = data.lat
        response.data.lng = data.lng
        res.status(201).json(response)
    }).catch(err => {
        res.status(500).json({
            response
        })
    })
})

router.put('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }
    Maps.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    }, {
        new: true
    }).then(data => {
        response.message = "data have been updated"
        response.success = true
        response.data.title = data.title
        response.data.lat = data.lat
        response.data.lng = data.lng
        res.status(201).json(response)
    }).catch(err => {
        res.status(500).json({
            response
        })
    })
})

router.delete('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }
    Maps.findByIdAndRemove(req.params.id)
        .then(data => {
            response.success = true
            response.message = " data have been deleted"
            response.data.id = req.params.id
            response.data.title = data.title
            response.data.lat = data.lat
            response.data.lng = data.lng
            res.status(201).json(response)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }
    Maps.findById(req.parans.id)
    .then(data => {
        response.success = true 
        response.message = " data found"
        response.data.id = req.params.id
        response.data.title = data.title
        response.data.lat = data.lat
        response.data.lng = data.lng
        res.status(200).json(response)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = router;