const db = require("../models");
const Task = db.tasks;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
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
  Task.create(task)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });  
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  Task.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.findExecuted = (req, res) => {
  Task.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};
exports.findUnexecuted = (req, res) => {
  Task.findAll({ where: { status: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Task with id=" + id
        });
      });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  };

  const id = req.params.id;
  Task.update(req.body, { where: { id: id } })
  .then(
    num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    }
  )
  .catch(err => {
    res.status(500).send({
      message: "Error updating Task with id=" + id
    });
  });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  console.log('deleteAllContr');
  Task.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tasks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks."
        });
      });
};