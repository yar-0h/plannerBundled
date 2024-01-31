// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const db = require('../db/db');

// TASKS
// retrieve all tasks
async function getAll() {
    var results = await db.query(
        `SELECT * FROM tasks`, []
    );
    
    return results
}

// create single task
async function create(task) {
    var sql = "INSERT INTO tasks (description, dateCreated, dateDue, priority) VALUES (?, ?, ?, ?)"
    var params = [task.description, task.dateCreated, task.dateDue, task.priority]
        
    var result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`task ${result.lastID} created successfully`);
    }
    else {console.log('error creating task');}
    
    return task;
}

// delete single task
async function remove(id) {
    var sql = "DELETE FROM tasks WHERE id=?"

    const result = await db.affect(sql, id);

    if (result.changes > 0) {
        console.log(`task ${id} deleted successfully`);
    }
    else {console.log(`error deleting task ${id}`)}

    return result.changes;
}

// delete all tasks
async function removeAll() {    
    const result = await db.affect(
        `DELETE FROM tasks`
    , []);
        
    console.log(`removed ${result.changes} tasks`)
    
    return result.changes;
}

// update task
async function update(id, task) {
    var sql = "UPDATE tasks SET description=?, dateDue=?, dateCompleted=?, priority=?, complete=? WHERE id=?"
    var params = [task.description, task.dateDue, task.dateCompleted, task.priority, task.complete, id]

    const result = await db.affect(sql, params);

    if (result.changes > 0) {
        console.log(`task ${id} updated successfully`);
    }
    else {console.log(`error updating task ${id}`);}
    
    task.id = Number(id)
    
    return task}

module.exports = {
    getAll, create, remove, removeAll, update
}