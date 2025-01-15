const db = require('../config/db');

const Task = {
    create: (task, result) => {
        const sql = 'INSERT INTO tasks SET ?';
        db.query(sql, task, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, { id: res.insertId, ...task });
            }
        });
    },

    getAll: (result) => {
        const sql = 'SELECT * FROM tasks';
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    update: (id, task, result) => {
        const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
        db.query(sql, [task.completed, id], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, { id: id, ...task });
            }
        });
    },

    delete: (id, result) => {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        db.query(sql, id, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = Task;
