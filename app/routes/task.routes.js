const { authJwt } = require("../middleware");
const tasks = require("../controllers/task.controller.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.get("/executed", tasks.findExecuted);

  router.get("/unexecuted", tasks.findUnexecuted);
  
  router.get('/', tasks.findAll);
  
  router.get("/:id", tasks.findOne);
  
  router.post('/', [authJwt.verifyToken], tasks.create);
  
  router.put("/:id", [authJwt.verifyToken], tasks.update);
  
  router.delete("/:id", [authJwt.verifyToken], tasks.delete);
  
  router.delete("/", [authJwt.verifyToken], tasks.deleteAll);

  app.use('/api/tasks', router);
};
