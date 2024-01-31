// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const db = require('../db/db');

// GOALS
// retrieve all goals
async function getAll() {
    const results = await db.query(
        `SELECT * FROM goals`, []
    );
    
    return results
}

// create single goal
async function create(goal) {
    var sql = "INSERT INTO goals (description, dateCreated, dateDue, goal) VALUES (?, ?, ?, ?)"
    var params = [goal.description, goal.dateCreated, goal.dateDue, goal.goal]
    
    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`goal ${result.lastID} created successfully`);
    }
    else {console.log('error creating goal');}
    
    return goal;
}

// delete single goal
async function remove(id) {
    var sql = "DELETE FROM goals WHERE id=?"
    
    const result = await db.affect(sql, id);

    if (result.changes > 0) {
        console.log(`goal ${id} deleted successfully`);
    }
    else {console.log(`error deleting goal ${id}`)}

    return result.changes;
}

// delete all goals
async function removeAll() {
    const result = await db.affect(
        `DELETE FROM goals`
    , []);
        
    console.log(`removed ${result.changes} goals`)
    
    return result.changes;
}


// update task
async function update(id, goal) {
    var sql = "UPDATE goals SET description=?, dateDue=?, dateCompleted=?, goal=?, achieved=? WHERE id=?"
    var params = [goal.description, goal.dateDue, goal.dateCompleted, goal.goal, goal.achieved, id]
    
    const result = await db.affect(sql, params);
    
    if (result.changes > 0) {
        console.log(`goal ${id} updated successfully`);
    }
    else {console.log(`error updating goal ${id}`);}
    
    return result.changes;
}

module.exports = {
    getAll, create, remove, removeAll, update
}
