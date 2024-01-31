// used to communicate with mySQL database
// const {createConnection} = require('mysql2/promise');
// const {db} = require('./config');

const { application } = require('express');


const fs = (require('fs'));

const sqlite3 = require('sqlite3').verbose();
const databaseName = 'planner.db'
const path = require('path')
const pathName = path.join(__dirname, databaseName)



// async function query(sql, params) {
//     const connection = await createConnection(db);
//     const [results, ] = await connection.execute(sql, params);
//     connection.end(); 
//     return results;
// }

async function query(sql, params) {

    let db = new sqlite3.Database('./db/planner.db', (err) => {
        if (err) {
            console.err(err.message);
        }
    })

    const results = await new Promise(function (resolve, reject) {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.err(err.message);
            }
    
            resolve(rows)

            db.close((err) => {
                if (err) {
                    console.err(err.message);
                }
            })
        });
    })

    // console.log(results)
    return results
}

async function affect(sql, params) {

    let db = new sqlite3.Database('./db/planner.db', (err) => {
        if (err) {
            console.err(err.message);
        }
    })
//    db.run(`INSERT INTO tasks (description, dateCreated, dateDue, priority) VALUES (?, ?, ?, ?)`, ['postman testtask', '2033-11-11 11:11:11', '2033-11-22 12:12:12', '3'], function(err) {
//     if (err) {
//         return console.log(err.message)
//     }
//    })
    
    const results = await new Promise(function(resolve, reject) {
        db.run(sql, params, function(err) {
        if (err) {
            console.log(err.message)
        }
        resolve(this)
        })
    })

    db.close((err) => {
        if (err) {
            console.err(err.message);
        }
    })

    return results
}



function reset() {

    // db4free doesnt allow db initialization
    
    // initialize database
    // try {
    //     const result = await query(
    //         `CREATE DATABASE IF NOT EXISTS plannerDB`
    //     );
    // } 
    // catch (err) {
    //     console.error(`error initializing database `, err.message);
    //     throw (err);
    // }

    // initialize events table
    console.log(`clearing database...`);

    try {
        // clear potential events table
        query(
            `DROP TABLE IF EXISTS tasks`
        );

        query(
            `CREATE TABLE IF NOT EXISTS events (
                id INTEGER NOT NULL PRIMARY KEY,
                description varchar(255) NOT NULL,
                startTime DATETIME NOT NULL,
                endTime DATETIME NOT NULL,
                notes varchar(255),
                category INTEGER DEFAULT 0
            );`
        );
    }
    catch (err) {
        console.error(`error initializing events table`, err.message);
        throw (err);
    }


    // initialize goals table
    try {   
        // clear potential goals table
        query(
            `DROP TABLE IF EXISTS goals`
        );
        query(
            `CREATE TABLE IF NOT EXISTS goals (
                id INTEGER NOT NULL PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                dateDue DATETIME,
                dateCompleted DATETIME,
                goal INTEGER NOT NULL,
                achieved INTEGER DEFAULT 0
            );`
        );
    } 
    catch (err) {
        console.error(`error initializing goals table`, err.message);
        throw (err);
    }

    // initialize habits table
    try {
        // clear potential habits table
        query(
            `DROP TABLE IF EXISTS habits`
        );

        query(
            `CREATE TABLE IF NOT EXISTS habits (
                id INTEGER NOT NULL PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                frequency INTEGER NOT NULL,
                period INTEGER NOT NULL
            )`
        );
    } 
    catch (err) {
        console.error(`error initializing habits table `, err.message);
        throw (err);
    }

    // initialize habitRecords table
    try {
        // clear potential habitrecords table
        query(
            `DROP TABLE IF EXISTS habitRecords`
        );

        query(
            `CREATE TABLE IF NOT EXISTS habitRecords (
                id INTEGER NOT NULL,
                date DATETIME NOT NULL,
                PRIMARY KEY(id, date)  
            )`
        );
    } 
    catch (err) {
        console.error(`error initializing habitRecords table `, err.message);
        throw (err);
    }

    // initialize tasks table
    try {
        // clear potential tasks table
        query(
            `DROP TABLE IF EXISTS tasks`
        );

        query(
            `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER NOT NULL PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                dateDue DATETIME,
                dateCompleted DATETIME,
                complete BOOLEAN DEFAULT FALSE,
                priority INTEGER NOT NULL
            )`
        );
    } 
    catch (err) {
        console.error(`error initializing tasks table `, err.message);
        throw (err);
    }

    console.log(query("SELECT count(*) FROM events"));
    console.log("database successfully reset")
}



module.exports = {
    query,
    affect,
    reset
}
