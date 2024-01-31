const express = require('express');
const habits = require('../services/habits.js');
const app = express.Router();


/* GET events */
app.get('/', async function(req, res , next) {
    try {
        res.json(await habits.getAllRecords());
    } catch (err) {
        console.error(`error retrieving habit records `, err.message);
        next(err);
    }
});

app.get('/:id', async function(req, res , next) {
    try {
        res.json(await habits.getHabitRecords(req.params.id));
    } catch (err) {
        console.error(`error retrieving habit record `, err.message);
        next(err);
    }
});


/* POST events */
app.post('/:id', async function(req, res , next) {
    try {
        res.json(await habits.createRecord(req.params.id, req.body));
    } catch (err) {
        console.error(`error creating habit record `, err.message);
        next(err);
    }
});


/* DELETE events */
app.delete('/:id/:date', async function(req, res , next) {
    try {
        res.json(await habits.removeRecord(req.params.id, req.params.date));
    } catch (err) {
        console.error(`error deleting habit record`, err.message);
        next(err);
    }
});

app.delete('/:id', async function(req, res , next) {
    try {
        res.json(await habits.removeHabitRecords(req.params.id));
    } catch (err) {
        console.error(`error deleting habit history`, err.message);
        next(err);
    }
});

app.delete('/', async function(req, res , next) {
    try {
        res.json(await habits.removeAllRecords());
    } catch (err) {
        console.error(`error deleting total habit history`, err.message);
        next(err);
    }
});

module.exports = app;