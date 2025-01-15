const Task = require('../models/Task');

exports.createTask = (req, res) => {
    const newTask = {
        task: req.body.task,
        category: req.body.category,
        completed: req.body.completed
    };

    Task.create(newTask, (err, task) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Task.'
            });
        } else {
            res.status(201).send(task);
        }
    });
};

exports.getAllTasks = (req, res) => {
    Task.getAll((err, tasks) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving tasks.'
            });
        } else {
            res.status(200).send(tasks);
        }
    });
};

exports.updateTask = (req, res) => {
    Task.update(req.params.id, req.body, (err, task) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the Task.'
            });
        } else {
            res.status(200).send(task);
        }
    });
};

exports.deleteTask = (req, res) => {
    Task.delete(req.params.id, (err, task) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the Task.'
            });
        } else {
            res.status(200).send({ message: 'Task deleted successfully!' });
        }
    });
};
