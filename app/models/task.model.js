module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    date: {
      type: Sequelize.DATE
    },
    file: {
      type: Sequelize.TEXT
    },
    createdAt: {
      type: Sequelize.DATE
    }
  });
 
  return Task;
};