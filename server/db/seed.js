const mysql = require('mysql2/promise');
const db = require('./db');
const seedValues = require("./seedvalues.json")
const util = require('../helper.js');


async function seed() {
    // reset and initialize database
    console.log("clearing database");
    try {
        await db.reset();
    }
    catch (err) {
        console.error(`error resetting database`, err.message);
        throw (err);
    }
    console.log("database cleared");
    console.log(". . .");
    console.log("seeding database");

    // inserting seed values
    try {
        console.log("seeding events table");
        for (let i in seedValues.events) {
            var sql = mysql.format("INSERT INTO events (description, startTime, endTime, notes, category) VALUES (?, ?, ?, ?, ?)", 
                [seedValues.events[i].description, seedValues.events[i].startTime, seedValues.events[i].endTime, seedValues.events[i].notes, seedValues.events[i].category]);
            await db.query(sql);
        }

        console.log("seeding goals table");
        for (let i in seedValues.goals) {
            var sql = mysql.format("INSERT INTO goals (description, dateCreated, dateDue, goal) VALUES (?, ?, ?, ?)", 
                [seedValues.goals[i].description, seedValues.goals[i].dateCreated, seedValues.goals[i].dateDue, seedValues.goals[i].goal]);
            await db.query(sql);
        }
    
        console.log("seeding habits table");
        for (let i in seedValues.habits) {
            var sql = mysql.format("INSERT INTO habits (description, dateCreated, frequency, period) VALUES (?, ?, ?, ?)", 
                [seedValues.habits[i].description, seedValues.habits[i].dateCreated, seedValues.habits[i].frequency, seedValues.habits[i].period])
            await db.query(sql);
        }

        console.log("seeding tasks table");
        for (let i in seedValues.tasks) {
            var sql = mysql.format("INSERT INTO tasks (description, dateCreated, dateDue, priority) VALUES (?, ?, ?, ?)", 
                [seedValues.tasks[i].description, seedValues.tasks[i].dateCreated, seedValues.tasks[i].dateDue, seedValues.tasks[i].priority]);
            await db.query(sql);
        }   

        console.log("seeding habitrecords table");
        for (let i in seedValues.habitRecords) {
            var sql = mysql.format("INSERT INTO habitRecords (id, date) VALUES (?, ?)", 
                [seedValues.habitRecords[i].id, seedValues.habitRecords[i].date]);
            await db.query(sql);
        }
    } 
    catch (err) {
        console.error(`error seeding database`, err.message);
        throw (err);
    }

    console.log("database seeded");
    console.log(". . .");
    console.log("checking database");



    // checking tables
    try {
        result = await db.query(
            `SELECT * FROM events`
        );
        console.log("-events table-");
        console.log(result);

        result = await db.query(
            `SELECT * FROM habits`
        );
        console.log("-habits table-");
        console.log(result);

        result = await db.query(
            `SELECT * FROM goals`
        );
        console.log("-goals table-");
        console.log(result);

        result = await db.query(
            `SELECT * FROM habitRecords`
        );
        console.log("-habit record table-");
        console.log(result);

        result = await db.query(
            `SELECT * FROM tasks`
        );
        console.log("-tasks table-");
        console.log(result);
    } 

    catch (err) {
        console.error(`error retrieving tables `, err.message);
        throw (err);
    }

    util.exit('database reset complete');
}

seed();
