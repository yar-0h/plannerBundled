const express = require('express');
const habits = require('../services/habits.js')
const app = express.Router();


/* GET habits */
app.get('/', async function(req, res , next) {
    try {
        res.json(await habits.getAll());
    } catch (err) {
        console.error(`error retrieving habits `, err.message);
        next(err);
    }
});


/* POST events */
app.post('/', async function(req, res , next) {
    try {
        res.json(await habits.create(req.body));
    } catch (err) {
        console.error(`error creating habit `, err.message);
        next(err);
    }
});


/* PUT events */
app.put('/:id', async function(req, res , next) {
    try {
        res.json(await habits.update(req.params.id, req.body));
    } catch (err) {
        console.error(`error updating habit `, err.message);
        next(err);
    }
});


/* DELETE events */
app.delete('/', async function(req, res , next) {
    try {
        res.json(await habits.removeAll());
    } catch (err) {
        console.error(`error deleting habits `, err.message);
        next(err);
    }
});


app.delete('/:id', async function(req, res , next) {
    try {
        res.json(await habits.remove(req.params.id));
    } catch (err) {
        console.error(`error deleting habit `, err.message);
        next(err);
    }
});


module.exports = app;