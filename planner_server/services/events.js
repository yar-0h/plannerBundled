// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const mysql = require('mysql2/promise');
const db = require('../db/db');
const helper = require('../helper')

// EVENTS
// retrieve all events
async function getAll() {
    const rows = await db.query(
        `SELECT * FROM events`
    );

    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// // retrieve all events within time period
// async function getAll(page = 1, startTime, endTime) {
//     const offset = helper.getOffset(page, config.listPerPage);

//     const rows = await db.query(
//         `SELECT * FROM events \
//          WHERE startTime <= ${endTime} 
//          AND endTime >= ${startTime}
//          LIMIT ${offset}, ${config.listPerPage}`
//     );

//     const data = helper.emptyOrRows(rows); 
//     const meta = {page};
    
//     return {
//         data,
//         meta
//     }
// }


// retrieve single event
async function get(id) {
    var sql = mysql.format("SELECT * FROM events WHERE id=?", id);

    const result = await db.query(sql);

    return result;
}

// create single event
async function create(event) {
    var sql = mysql.format("INSERT INTO events (description, startTime, endTime, notes, category) VALUES (?, ?, ?, ?, ?)", 
        [event.description, event.startTime, event.endTime, event.notes, event.category]);

    const msDiff = Math.abs(new Date(event.startTime) - new Date(event.endTime));
    const minDiff = Math.floor((msDiff/1000)/60);

    if (minDiff < 15) {
        throw new Error('event must be at least 15 minutes long')
    }

    if (event.endTime < event.startTime) {
        throw new Error('invalid start time');
    }

    if (event.description.length < 1) {
        throw new Error('missing event description');
    }
    
    const result = await db.query(sql);

    if (result.affectedRows) {
        console.log(`event ${result.insertId} created successfully`);
    }
    else {console.log('error creating event');}

    const returnResult = await get(result.insertId);

    
    return returnResult;
}


// // create single event
// async function create(event) {
//     var sql = mysql.format("INSERT INTO events (description, startTime, endTime) VALUES (?, ?, ?)", 
//         [event.description, event.startTime, event.endTime]);

//     const result = await db.query(sql);

//     let message = 'error creating event';
//     if (result.affectedRows) {
//         message = 'event created successfully';
//     }
//     return {message};
// }

// delete single event
async function remove(id) {
    var sql = mysql.format("DELETE FROM events WHERE id=?", id); 

    const result = await db.query(sql);

    let message = 'error deleting event'
    if (result.affectedRows) {
        console.log('event deleted successfully')
        message = 'event deleted successfuly'
    }
    else {console.log('error deleting event')}

    return {message};
}

// delete all events
async function removeAll() {
    const result = await db.query(
        `TRUNCATE TABLE events`
    );

    let message = 'all events deleted successfuly'
    if (result.affectedRows) {
        console.log('error deleting all events')
        message = 'error deleting all events'
    }
    else {console.log('all events deleted successfully')}

    return {message};
}

// // delete all events in time window
// async function removeChunk(startTime, endTime) {
//     const result = await db.query(
//         `DELETE FROM events 
//          WHERE startTime >= ${startTime}
//          AND endTime <= ${endTime}`
//     );

//     let message = 'error deleting event'
//     if (result.affectedRows) {
//         message = 'event created successfuly'
//     }
//     return {message};
// }

// update event
// async function update(id, event) {
//     var sql = mysql.format("UPDATE events SET description=?, startTime=?, endTime=? WHERE id=?", [event.description, event.startTime, event.endTime, id]); 

//     const result = await db.query(sql);

//     let message = 'error updating event';
//     if (result.affectedRows) {
//         message = 'event updated successfully';
//     }
//     return {message};
// }


async function update(id, event) {
    const msDiff = Math.abs(new Date(event.startTime) - new Date(event.endTime));
    const minDiff = Math.floor((msDiff/1000)/60);

    if (minDiff < 15) {
        throw new Error('event must be at least 15 minutes long')
    }

    if (event.endTime < event.startTime) {
        throw new Error('invalid start time');
    }

    if (event.description.length < 1) {
        throw new Error('missing event description');
    }
    
    var sql = mysql.format("UPDATE events SET description=?, startTime=?, endTime=?, notes=?, category=? WHERE id=?", [event.description, event.startTime, event.endTime, event.notes, event.category, id]); 

    const result = await db.query(sql);
    
    if (result.affectedRows) {
        console.log(`event ${id} updated successfully`);
    }
    else {console.log('error updating event');}
    
    const returnResult = await get(id);
    
    return returnResult;
    
}


module.exports = {
    getAll, create, remove, removeAll, update
}

