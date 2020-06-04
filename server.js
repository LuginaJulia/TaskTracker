var express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const path = require('path')
const db = require("./app/models");
db.sequelize.sync();

// Create an express server and a GraphQL endpoint
var app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);

app.use(cors(corsOptions));

require("./app/routes/task.routes")(app);

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