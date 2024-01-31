const express = require('express');
const tasks = require('../services/tasks.js');
const app = express.Router();

// create single // create(task)
// delete single // remove(id) 
// delete all // removeAll()
// update one // update(id, task)

/* GET tasks */
app.get('/', async function(req, res , next) {
    try {
        res.json(await tasks.getAll());
    } catch (err) {
        console.error(`error retrieving tasks `, err.message);
        next(err);
    }
});

/* POST tasks */
app.post('/', async function(req, res , next) {    
    try {
        res.json(await tasks.create(req.body));
    } catch (err) {
        console.error(`error creating task `, err.message);
        next(err);
    }
});

/* PUT tasks */
app.put('/:id', async function(req, res , next) {
    try {
        res.json(await tasks.update(req.params.id, req.body));
    } catch (err) {
        console.error(`error updating task `, err.message);
        next(err);
    }
});

/* DELETE tasks */
app.delete('/', async function(req, res , next) {
    try {
        res.json(await tasks.removeAll());
    } catch (err) {
        console.error(`error deleting tasks `, err.message);
        next(err);
    }
});

app.delete('/:id', async function(req, res , next) {
    try {
        res.json(await tasks.remove(req.params.id));
    } catch (err) {
        console.error(`error deleting task `, err.message);
        next(err);
    }
});

module.exports = app;