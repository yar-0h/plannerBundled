// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const mysql = require('mysql2/promise');
const db = require('../db/db').default;
const helper = require('../helper')


// GOALS
// retrieve all goals
async function getAll() {
    const rows = await db.query(
        `SELECT * FROM goals`
    );
    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// create single goal
async function create(goal) {
    var sql = mysql.format("INSERT INTO goals (description, dateCreated, dateDue, goal) VALUES (?, ?, ?, ?)", [goal.description, goal.dateCreated, goal.dateDue, goal.goal]); 
    
    const result = await db.query(sql);

    let message = 'error creating goal';
    if (result.affectedRows) {
        message = 'goal created successfully';
    }
    return {message};
}

// delete single goal
async function remove(id) {
    var sql = mysql.format("DELETE FROM goals WHERE id=?", id); 
    
    const result = await db.query(sql);

    let message = 'error deleting goal'
    if (result.affectedRows) {
        message = 'goal deleted successfuly'
    }
    return {message};

}

// delete all goals
async function removeAll() {
    const result = await db.query(
        `TRUNCATE TABLE goals`
    );

    let message = 'all goals deleted successfuly'
    if (result.affectedRows) {
        message = 'error deleting all goals'
    }
    return {message};

}


// update task
async function update(id, goal) {
    var sql = mysql.format("UPDATE goals SET description=?, dateDue=?, dateCompleted=?, goal=?, achieved=? WHERE id=?", 
        [goal.description, goal.dateDue, goal.dateCompleted, goal.goal, goal.achieved, id]); 
    
    const result = await db.query(sql);
    
    let message = 'error updating goal';
    if (result.affectedRows) {
        message = 'goal updated successfully';
    }
    return {message};
}

module.exports = {
    getAll, create, remove, removeAll, update
}
