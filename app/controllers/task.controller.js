const db = require("../models");
const Task = db.tasks;

// Create and Save a new Task
exports.create = function(req) {
  // Create a Task
  const task = {
    name: req.name,
    description: req.description,
    file: req.file, 
    date: req.date,
    status: req.status ? req.status : false
  };

  // Save Task in the database
  return Task.create(task)
    .then(data => { return data })
    .catch(err => {
      return new Task()
    });  
};

// Retrieve all Tasks from the database.
exports.findAll = function(args) {
  return Task.findAll()
    .then(data => { return data })
    .catch(err => {
      return { status: 400, message: err.message || "Some error occurred while retrieving tasks." };
    });
};

exports.findByFilter = function(args) {
  return Task.findAll({ where: { status: args.filter } })
    .then(data => { return data })
    .catch(err => {
      return { status: 400, message: err.message || "Some error occurred while retrieving tasks." };
    });
};

// Find a single Task with an id
exports.findOne = function(args) {
  return Task.findByPk(args.id)
    .then(data => { return data })
    .catch(err => {
      return { status: 400, message: err.message || "Some error occurred while retrieving tasks." };
    });
};

// Update a Task by the id in the request
exports.update = function(req) {
  return Task.update(req, { where: { id: req.id } })
    .then(
      num => {
        if (num == 1) {
            return "Task was updated successfully."
        } else {
          return `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        }
      }
    )
    .catch(() => { 
      return "Error updating Task with id=" + id
    });
};

// Delete a Task with the specified id in the request
exports.delete = function(req) {
  return Task.destroy({ where: { id: req.id }})
    .then(num => {
      if (num == 1) {
        return "Task was deleted successfully!"
      } else {
        return `Cannot delete Task with id=${id}. Maybe Task was not found!`
      }
    })
    .catch(() => {
      return "Could not delete Task with id=" + id
    });
};

// Delete all Tasks from the database.
exports.deleteAll = function(req) {
  return Task.destroy({ where: {}, truncate: false })
    .then(nums => {
      return `${nums} tasks were deleted successfully!`
    })
    .catch(() => {
      return "Some error occurred while removing all tasks." 
    });
};