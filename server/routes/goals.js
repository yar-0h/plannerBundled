const express = require('express');
const goals = require('../services/goals.js');
const app = express.Router();

// create single // create(goal)
// delete single // remove(id) 
// delete all // removeAll()
// update one // update(id, goal)


/* GET events */
app.get('/', async function(req, res , next) {
    try {
        res.json(await goals.getAll());
    } catch (err) {
        console.error(`error retrieving goals `, err.message);
        next(err);
    }
});


/* POST events */
app.post('/', async function(req, res , next) {
    try {
        res.json(await goals.create(req.body));
    } catch (err) {
        console.error(`error creating goal `, err.message);
        next(err);
    }
});


/* PUT events */
app.put('/:id', async function(req, res , next) {
    try {
        res.json(await goals.update(req.params.id, req.body));
    } catch (err) {
        console.error(`error updating goal `, err.message);
        next(err);
    }
});


/* DELETE events */
app.delete('/', async function(req, res , next) {
    try {
        res.json(await goals.removeAll());
    } catch (err) {
        console.error(`error deleting goals `, err.message);
        next(err);
    }
});

app.delete('/:id', async function(req, res , next) {
    try {
        res.json(await goals.remove(req.params.id));
    } catch (err) {
        console.error(`error deleting goal `, err.message);
        next(err);
    }
});

module.exports = app;

