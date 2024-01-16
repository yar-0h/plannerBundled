// used to communicate with mySQL database
const {createConnection} = require('mysql2/promise');
const {db} = require('./config');


async function query(sql, params) {
    const connection = await createConnection(db);
    const [results, ] = await connection.execute(sql, params);
    connection.end(); 
    return results;
}


async function reset() {

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
        await query(
            `DROP TABLE IF EXISTS events`
        );
        
        await query(
            `CREATE TABLE events (
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                description varchar(255) NOT NULL,
                startTime DATETIME NOT NULL,
                endTime DATETIME NOT NULL,
                notes varchar(255),
                category int DEFAULT 0
            );`
        );
    } 
    catch (err) {
        console.error(`error initializing events table `, err.message);
        throw (err);
    }

    // initialize goals table
    try {   
        // clear potential goals table
        await query(
            `DROP TABLE IF EXISTS goals`
        );
        await query(
            `CREATE TABLE goals (
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                dateDue DATETIME,
                dateCompleted DATETIME,
                goal int NOT NULL,
                achieved int DEFAULT 0
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
        await query(
            `DROP TABLE IF EXISTS habits`
        );
        await query(
            `CREATE TABLE habits (
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                frequency int NOT NULL,
                period int NOT NULL
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
        await query(
            `DROP TABLE IF EXISTS habitRecords`
        );
        await query(
            `CREATE TABLE habitRecords (
                id int NOT NULL,
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
        await query(
            `DROP TABLE IF EXISTS tasks`
        );``
        await query(
            `CREATE TABLE tasks (
                id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                description varchar(255) NOT NULL,
                dateCreated DATETIME NOT NULL,
                dateDue DATETIME,
                dateCompleted DATETIME,
                complete BOOLEAN DEFAULT FALSE,
                priority int NOT NULL
            )`
        );
    } 
    catch (err) {
        console.error(`error initializing tasks table `, err.message);
        throw (err);
    }
}



module.exports = {
    query,
    reset
}
