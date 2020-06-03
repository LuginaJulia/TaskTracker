const db = require("../models");
const Task = db.tasks;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return Promise.resolve({ 
      message: "Title can not be empty!", status: 400
    });
  };

  // Create a Task
  const task = {
    name: req.body.name,
    description: req.body.description,
    file: req.body.file, 
    date: req.body.date,
    status: req.body.status ? req.body.status : false
  };
  
  // Save Task in the database
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.create(task)
        .then(() => { return { message: "Task was created.", status: 200 } })
        .catch(err => { return { message: err.message || "Some error occurred while retrieving tasks.", status: 400 } }) 
    );}
  });
};

// Retrieve all Tasks from the database.
exports.findAll = () => {
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.findAll()
        .then(data => { return { data: data } })
        .catch(err => { return { error: err.message || "Some error occurred while retrieving tasks." } }) 
    );}
  });
};

exports.findExecuted = () => {
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.findAll({ where: { status: true } })
        .then(data => { return { data: data } })
        .catch(err => { return { error: err.message || "Some error occurred while retrieving tasks." } }) 
    );}
  });
};

exports.findUnexecuted = () => {
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.findAll({ where: { status: false } })
        .then(data => { return { data: data } })
        .catch(err => { return { error: err.message || "Some error occurred while retrieving tasks." } }) 
    );}
  });
};

// Find a single Task with an id
exports.findOne = (params) => {
  const id = params.id;
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.findByPk(id)
        .then(data => { return { data: data } })
        .catch(err => { return { error: "Error retrieving Task with id=" + id } }) 
    );}
  });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body.name) {
    return Promise.resolve({ 
      message: "Title can not be empty!", status: 400
    });
  };

  const id = req.body.id;
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      Task.update(req.body, { where: { id: id } })
        .then(() => { return { message: "Task was updated.", status: 200 } })
        .catch(err => { return { message: err.message || "Some error occurred while retrieving tasks.", status: 400 } }) 
    );}
  });
};

// Delete a Task with the specified id in the request
exports.delete = (id) => {
  Task.destroy({ where: { id: id } });
};

// Delete all Tasks from the database.
exports.deleteAll = () => {
  Task.destroy({
    where: {},
    truncate: false
  })
};