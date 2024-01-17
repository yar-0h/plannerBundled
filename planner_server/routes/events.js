const express = require('express');
const events = require('../services/events.js');
const app = express.Router();


/* GET events */
app.get('/', async function(req, res , next) {
    // const filters = req.query.filters;
    // /**
    //  * filters = {
    //  *  start_time: "Bub",
    //  *  end_time: "Bob"
    //  * }
    //  */

    try {
        res.json(await events.getAll());
    } catch (err) {
        console.error(`error retrieving events `, err.message);
        next(err);
    }
});


/* POST events */
app.post('/', async function(req, res , next) {
    try {
        res.json(await events.create(req.body));
    } catch (err) {
        console.error(`error creating event `, err.message);
        next(err);
    }
});


/* PUT events */
app.put('/:id', async function(req, res , next) {
    try {
        res.json(await events.update(req.params.id, req.body));
    } catch (err) {
        console.error(`error updating event `, err.message);
        next(err);
    }
});


/* DELETE events */
app.delete('/', async function(req, res , next) {
    try {
        res.json(await events.removeAll());
    } catch (err) {
        console.error(`error deleting events `, err.message);
        next(err);
    }
});

app.delete('/:id', async function(req, res , next) {
    try {
        res.json(await events.remove(req.params.id));
    } catch (err) {
        console.error(`error deleting event `, err.message);
        next(err);
    }
});


module.exports = app;