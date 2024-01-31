// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
//
//GET /resource ->
//POST /resource -> 
//PUT /reseource/:id ->
//DELETE /resource/:id ->
const db = require('../db/db');

// HABITS
// retrieve all habits
async function getAll() {
    const results = await db.query(
        `SELECT * FROM habits`, []
    );
        
    return results
}

// retrieve single habit
async function get(id) {
    var sql = "SELECT * FROM habits WHERE id=?"

    const result = await db.query(sql, id);

    return result;
}

// create single habit
async function create(habit) {
    var sql = "INSERT INTO habits (description, dateCreated, frequency, period) VALUES (?, ?, ?, ?)"
    var params = [habit.description, habit.dateCreated, habit.frequency, habit.period]
    
    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`habit ${result.lastID} created successfully`);
    }
    else {console.log('error creating habit');}
    
    return habit;
}

// delete single habit
async function remove(id) {
    var sql = "DELETE FROM habits where id=?"

    const result = await db.affect(sql, id);

    if (result.changes > 0) {
        console.log(`habit ${id} deleted successfully`);

        removeHabitRecords(id);
    }
    else {console.log(`error deleting habit ${id}`)}

    return result.changes;
}

// delete all habits
async function removeAll() {
    const result = await db.affect(
        `DELETE FROM habits`
    , []);

    removeAllRecords();

    if (result.changes > 0) {
        console.log(`successfully deleted all habits`)
    }
    else {console.log(`error deleting all habits`)}

    return result.changes;
}


// update habit
async function update(id, habit) {
    var sql = "UPDATE habits SET description=?, frequency=?, period=? WHERE id=?"
    var params = [habit.description, habit.frequency, habit.period, id]

    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`habit ${id} updated successfully`);
    }
    else {console.log(`error updating habit ${id}`);}
    
    habit.id = Number(id)

    return habit;
}


// create habit record
async function createRecord(id, date) {
    var sql = "INSERT INTO habitRecords (id, date) VALUES (?, ?)"
    var params = [id, date.date]
    const habitCheck = await get(id)
    
    if (habitCheck.length < 1) {
        console.log('habit does not exist')
        return 0
    }
    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`habit ${id} record created at ${date.date} successfully`)
    }
    else console.log('error creating habit record')

    return date
}

// retrieve total habit record 
async function getAllRecords() {
    // const offset = helper.getOffset(page, config.listPerPage);
    const results = await db.query(
        `SELECT * FROM habitRecords`, []
    )
        
    return results
}

// retrieve record history for habit 
async function getHabitRecords(id) {
    var sql = "SELECT * FROM habitRecords WHERE id=?"
    const results = await db.query(sql, id);
    
    return results
}

// delete all habit's history
async function removeAllRecords() {
    const result = await db.affect(
        `DELETE FROM habitRecords`
    );

    console.log(`deleted ${result.changes} habit records`)

    return result.changes;
}


// delete single habit's history
async function removeHabitRecords(id) {
    var sql = "DELETE FROM habitRecords WHERE id=?"

    const result = await db.affect(sql, id);

    console.log(`deleted ${result.changes} habit ${id} records`)

    return result.changes;
}

// delete single habit Record instance
async function removeRecord(id, date) {
    var sql = "DELETE FROM habitRecords WHERE id=? AND date=?"
    var params = [id, date]
    console.log(date)
    const result = await db.affect(sql, params);

    console.log(`deleted ${result.changes} habit record`)
    return result.changes;
}


module.exports = {
    getAll, create, remove, removeAll, update, createRecord, getAllRecords, getHabitRecords, removeAllRecords, removeHabitRecords, removeRecord
}



