const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req) => {
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      User.create({
        username: req.username,
        email: req.email,
        password: bcrypt.hashSync(req.password, 8)
      })
      .then(() => {
        return { message: "User was registered successfully!", status: 200 }
      })
      .catch(err => {
        return { message: err.message, status: 500 }
      })
    );}
  });
};

exports.signin = (req) => {
  return Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill(
      User.findOne({ where: { username: req.username  } })
      .then(user => {
        if (!user) {
          return { message: "User Not found.", status: 400 };
        }

        var passwordIsValid = bcrypt.compareSync(req.password, user.password);
        if (!passwordIsValid) {
          return { accessToken: null, message: "Invalid Password!", status: 401 };
        }

        var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        return { 
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          },
          status: 200,
        };
      })
      .catch(err => {
        return { message: err.message, status: 500 }
      })
    );}
  });
}
