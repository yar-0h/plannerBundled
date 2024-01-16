// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
//
//GET /resource ->
//POST /resource -> 
//PUT /reseource/:id ->
//DELETE /resource/:id ->
const mysql = require('mysql2/promise');
const db = require('../db/db');
const helper = require('../helper')


// HABITS
// retrieve all habits
async function getAll() {
    const rows = await db.query(
        `SELECT * FROM habits`
    );
    
    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// retrieve single habit
async function get(id) {
    var sql = mysql.format("SELECT * FROM habits WHERE id=?", id);

    const result = await db.query(sql);

    return result;
}

// create single habit
async function create(habit) {
    var sql = mysql.format("INSERT INTO habits (description, dateCreated, frequency, period) VALUES (?, ?, ?, ?)",
        [habit.description, habit.dateCreated, habit.frequency, habit.period]);
    
    const result = await db.query(sql);

    if (result.affectedRows) {
        console.log(`habit ${result.insertId} created successfully`);
    }
    else {console.log('error creating habit');}

    const returnResult = await get(result.insertId);
    
    return returnResult;
}


// // create single habit
// async function create(habit) {
//     var sql = mysql.format("INSERT INTO habits (description, dateCreated, frequency, period) VALUES (?, ?, ?, ?)",
//         [habit.description, habit.dateCreated, habit.frequency, habit.period]);
    
//     const result = await db.query(sql);

//     let message = 'error creating habit';
//     if (result.affectedRows) {
//         message = 'habit created successfully';
//     }
//     return {message};
// }

// delete single habit
async function remove(id) {
    var sql = mysql.format("DELETE FROM habits where id=?", id);

    const result = await db.query(sql);

    let message = 'error deleting habit'
    if (result.affectedRows) {
        message = 'habit deleted successfuly'
        console.log(`habit ${id} deleted successfully`);

        removeHabitRecords(id);
    }
    else {console.log(`error deleting habit ${id}`)}

    return {message};
}

// delete all habits
async function removeAll() {
    const result = await db.query(
        `TRUNCATE TABLE habits`
    );

    let message = 'all habits deleted successfuly'
    removeAllRecords();

    if (result.affectedRows) {
        console.log(`error deleting ass habits`)
        message = 'error deleting all habits'
    }
    else {console.log(`successfully deleted all tasks`)}

    return {message};

}

// // update habit
// async function update(id, habit) {
//     var sql = mysql.format("UPDATE habits SET description=?, frequency=?, period=? WHERE id=?",
//         [habit.description, habit.frequency, habit.period, id]);

//     const result = await db.query(sql);

//     let message = 'error updating habit';
//     if (result.affectedRows) {
//         message = 'habit updated successfully';
//     }
//     return {message};
// }


// update habit
async function update(id, habit) {
    var sql = mysql.format("UPDATE habits SET description=?, frequency=?, period=? WHERE id=?",
        [habit.description, habit.frequency, habit.period, id]);

    const result = await db.query(sql);

    if (result.affectedRows) {
        console.log(`habit ${id} updated successfully`);
    }
    else {console.log('error updating habit');}

    const returnResult = await get(id);
    
    return returnResult;
}



// create habit record
async function createRecord(id, date) {
    var sql = mysql.format("INSERT INTO habitRecords (id, date) VALUES (?, ?)",
        [id, date.date]);
    
    const result = await db.query(sql);

    let message = 'error creating habit record';
    if (result.affectedRows) {
        message = 'habit record created successfully';
    }
    return {message};
}

// retrieve total habit record 
async function getAllRecords() {
    // const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM habitRecords`
    );
    
    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// retrieve record history for habit 
async function getHabitRecords(id) {
    var sql = mysql.format("SELECT * FROM habitRecords WHERE id=?", id)
    const rows = await db.query(sql);

    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// delete all habit's history
async function removeAllRecords() {
    const result = await db.query(
        `TRUNCATE TABLE habitRecords`
    );

    let message = 'habit history deleted successfuly'
    if (result.affectedRows) {
        message = 'error deleting habit history'
    }
    return {message};
}


// delete single habit's history
async function removeHabitRecords(id) {
    var sql = mysql.format("DELETE FROM habitRecords WHERE id=?", id)
    
    const result = await db.query(sql);

    let message = 'habit history deleted successfuly'
    if (result.affectedRows) {
        message = 'error deleting habit history'
    }
    return {message};
}

// delete single habit Record instance
async function removeRecord(id, date) {
    var sql = mysql.format("DELETE FROM habitRecords WHERE id=? AND date=?", [id, date])
    
    const result = await db.query(sql);

    let message = 'error deleting habit record'
    if (result.affectedRows) {
        message = 'habit record deleted successfuly'
    }
    return {message};
}


module.exports = {
    getAll, create, remove, removeAll, update, createRecord, getAllRecords, getHabitRecords, removeAllRecords, removeHabitRecords, removeRecord
}



