const express = require('express');
const router = express.Router();

const Athlete = require('./athletes-model');

router.get('/', (req, res) => {
    Athlete.getAll()
        .then(athletes => {
            res.status(200).json(athletes);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    Athlete.getById(req.params.id)
        .then(athlete => {
            if(!athlete) {
                res.status(404).json('404 error');
            }
            else {
                res.status(200).json(athlete);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/', (req, res) => {
    Athlete.create(req.body)
        .then(athlete => {
            res.status(201).json(athlete);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    Athlete.remove(req.params.id)
        .then(athlete => {
            if(athlete.length === 0) { 
                res.status(404).json('404 error');
            }
            else {
                res.status(202).json(athlete);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router;