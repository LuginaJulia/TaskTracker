const taskController = require("../controllers/task.controller.js");
var express_graphql = require('express-graphql');
var schema = require("../schema/task.schema")();

module.exports = app => {
  var api = {
    task: taskController.findOne,
    filteredTasks: taskController.findByFilter,
    tasks: taskController.findAll,
    update: taskController.update,
    create: taskController.create,
    delete: taskController.delete,
    deleteAll: taskController.deleteAll,
    Date: {
      __serialize(value) {
        return value;
      },
      __parseValue(value) {
        return value;
      },
      __parseLiteral(ast) {
        return JSON.parse(JSON.stringify(ast)).value;
      }
    }
  };
  app.use('/api', express_graphql({
    schema: schema,
    rootValue: api,
    graphiql: true
  }));
};
