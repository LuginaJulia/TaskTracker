const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

var io = require('socket.io')(server);

const tasksController = require("./app/controllers/task.controller.js");
const authController = require("./app/controllers/auth.controller.js");

io.on('connection', function(socket) {
  console.log('User connected');

  socket.on('signup', function(params) {
    authController.signup(params).then(res => { io.emit("executed", res ) });
  });

  socket.on('signin', function(params) {
    authController.signin(params).then(res => { io.emit("executed", res ) });
  });

  socket.on('tasks_all', function(params) {
    switch (params.filter) {
      case 'executed': 
        tasksController.findExecuted().then(res => { io.emit("tasksList", res ) });
        break;
      case 'unexecuted': 
        tasksController.findUnexecuted().then(res => { io.emit("tasksList", res ) });
        break;
      default:
        tasksController.findAll().then(res => { io.emit("tasksList", res ) });
    }
  });

  socket.on('task', function(params) {
    tasksController.findOne(params).then(res => { io.emit("task", res ) });
  });

  socket.on('taskUpdate', function(params) {
    tasksController.update(params).then(res => { io.emit("executed", res ) });
  });

  socket.on('taskCreate', function(params) {
    tasksController.create(params).then(res => { io.emit("executed", res ) });
  });

  socket.on('taskDelete', function(params) {
    tasksController.delete(params.id).then(res => { io.emit("executed", res ) });;;
  });

  socket.on('tasksDelete', function() {
    tasksController.deleteAll().then(res => { io.emit("executed", res ) });;
  });
})