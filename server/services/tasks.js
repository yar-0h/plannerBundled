// a service
// provides the 'other end of the tube provided by the routes connecting to the URI (uniform resource identifier)'
// has methods used to get and create whatever resource this manages
const mysql = require('mysql2/promise');
const db = require('../db/db');
const helper = require('../helper')

// TASKS
// retrieve all tasks
async function getAll() {
    const rows = await db.query(
        `SELECT * FROM tasks`
    );
    const data = helper.emptyOrRows(rows); 
    
    return {
        data,
    }
}

// retrieve single task
async function get(id) {
    var sql = mysql.format("SELECT * FROM tasks WHERE id=?", id);

    const result = await db.query(sql);

    return result;
}

// create single task
async function create(task) {
    var sql = mysql.format("INSERT INTO tasks (description, dateCreated, dateDue, priority) VALUES (?, ?, ?, ?)",
        [task.description, task.dateCreated, task.dateDue, task.priority]);
        
    const result = await db.query(sql);

    if (result.affectedRows) {
        console.log(`task ${result.insertId} created successfully`);
    }
    else {console.log('error creating task');}

    const returnResult = await get(result.insertId);
    
    return returnResult;
}

// async function create(task) {
//     var sql = mysql.format("INSERT INTO tasks (description, dateCreated, dateDue, priority) VALUES (?, ?, ?, ?)",
//         [task.description, task.dateCreated, task.dateDue, task.priority]);
        
//     const result = await db.query(sql);

//     let message = 'error creating task';
//     if (result.affectedRows) {
//         message = 'task created successfully';
//     }
//     // console.log(result);
//     return {message};
// }

// delete single task
async function remove(id) {
    var sql = mysql.format("DELETE FROM tasks WHERE id=?", id);

    const result = await db.query(sql);

    let message = 'error deleting task'
    if (result.affectedRows) {
        message = 'task deleted successfuly';
        console.log(`task ${id} deleted successfully`);
    }
    else {console.log(`error deleting task ${id}`)}

    return {message};
}

// delete all tasks
async function removeAll() {
    const result = await db.query(
        `TRUNCATE TABLE tasks`
    );

    let message = 'all tasks deleted successfuly'
    if (result.affectedRows) {
        message = 'successfully deleted all tasks'
        console.log(`successfully deleted all tasks`)
    }
    else {console.log(`error deleting all tasks`)}
    return {message};

}

// // update task
// async function update(id, task) {
//     var sql = mysql.format("UPDATE tasks SET description=?, dateDue=?, dateCompleted=?, priority=?, complete=? WHERE id=?", 
//         [task.description, task.dateDue, task.dateCompleted, task.priority, task.complete, id]);

//     const result = await db.query(sql);

//     let message = 'error updating task';
//     if (result.affectedRows) {
//         message = 'task updated successfully';
//     }
//     return {message};
// }


// update task
async function update(id, task) {
    var sql = mysql.format("UPDATE tasks SET description=?, dateDue=?, dateCompleted=?, priority=?, complete=? WHERE id=?", 
        [task.description, task.dateDue, task.dateCompleted, task.priority, task.complete, id]);

    const result = await db.query(sql);

    if (result.affectedRows) {
        console.log(`task ${id} updated successfully`);
    }
    else {console.log('error updating task');}

    const returnResult = await get(id);
    
    return returnResult;
}



module.exports = {
    getAll, create, remove, removeAll, update
}