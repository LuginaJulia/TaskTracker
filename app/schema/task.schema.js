var { buildSchema } = require('graphql');

module.exports = () => {
  return buildSchema(`
    scalar Date
    type Query {
        filteredTasks(filter: Boolean!): [Task]
        tasks: [Task]
        task(id: Int!): Task
        message: String
    }
    type Mutation {
        create(name: String!, description: String, date: Date, status: Boolean, file: String): Task
        update(id: Int!, name: String!, description: String, date: Date, status: Boolean, file: String): String
        delete(id: Int!): String
        deleteAll: String
    }
    type Task {
        id: Int
        name: String
        description: String
        status: Boolean
        file: String
        date: Date
    }
  `)
}