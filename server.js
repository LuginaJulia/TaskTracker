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

// require("./app/routes/task.routes")(app);
require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

var io = require('socket.io')(server);

const tasksController = require("./app/controllers/task.controller.js");

io.on('connection', function(socket) {
  console.log('User connected');

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
    tasksController.findOne(params).then(res => { io.emit("taskForm", res ) });
  })
})