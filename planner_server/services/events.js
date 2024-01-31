// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const db = require('../db/db');

// EVENTS
// retrieve all events
async function getAll() {
    const results = await db.query(
        `SELECT * FROM events`, []
    );
    
    return results
}

// retrieve single event
async function get(id) {
    var sql = "SELECT * FROM events WHERE id=?"

    const result = await db.query(sql, id);

    return result;
}

// create single event
async function create(event) {
    var sql = "INSERT INTO events (description, startTime, endTime, notes, category) VALUES (?, ?, ?, ?, ?)"
    var params = [event.description, event.startTime, event.endTime, event.notes, event.category]

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
    
    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`event ${result.lastID} created successfully`);
    }
    else {console.log('error creating event');}

    event.id = result.lastID
    
    return event;
}

// delete single event
async function remove(id) {
    var sql = "DELETE FROM events WHERE id=?"

    const result = await db.affect(sql, id);

    if (result.changes > 0) {
        console.log(`event ${id} deleted successfully`);
    }
    else {console.log(`error deleting event ${id}`)}

    return result.changes;
}

// delete all events
async function removeAll() {
    const result = await db.affect(
        `DELETE FROM events`, []
    );

    console.log(`removed ${result.changes} events`)
    
    return result.changes;
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
    
    var sql = "UPDATE events SET description=?, startTime=?, endTime=?, notes=?, category=? WHERE id=?"
    var params = [event.description, event.startTime, event.endTime, event.notes, event.category, id]
    const result = await db.affect(sql, params);
    
    if (result.changes > 0) {
        console.log(`event ${id} updated successfully`);
    }
    else {console.log(`error updating event ${id}`);}
        
    event.id = Number(id)
    
    return event
}


module.exports = {
    getAll, create, remove, removeAll, update
}

