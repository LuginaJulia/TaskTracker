var express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const path = require('path')
const db = require("./app/models");
db.sequelize.sync();


var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        filteredTasks(filter: Boolean!): [Task]
        tasks: [Task]
        task(id: Int!): Task
        message: String
    }
    type Mutation {
        create(name: String!, description: String, date: String, status: Boolean, file: String): Task
        update(id: Int!, name: String!, description: String, date: String, status: Boolean, file: String): String
        delete(id: Int!): String
        deleteAll: String
    }
    type Task {
        id: Int
        name: String
        description: String
        status: Boolean
        file: String
        date: String
    }
`);
var taskController = require("./app/controllers/task.controller");

// Root resolver
var root = {
  task: taskController.findOne,
  filteredTasks: taskController.findByFilter,
  tasks: taskController.findAll,
  update: taskController.update,
  create: taskController.create,
  delete: taskController.delete,
  deleteAll: taskController.deleteAll
};
// Create an express server and a GraphQL endpoint
var app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);

app.use(cors(corsOptions));
app.use('/api', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});