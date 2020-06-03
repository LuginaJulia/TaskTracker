// import http from "../http-common";
// import authHeader from "./auth-header";

class TaskDataService {
  getAll(socket) {
    socket.client.emit("tasks_all", { filter: '' });
    socket.$subscribe('tasksList', function(response) {
      this.tasks = response.data;
    });
  }

  get(id, socket) {
    socket.client.emit("task", { id: id });
  }

  create(data, socket) {
    socket.client.emit("taskCreate", { body: data });
    socket.$subscribe('response', function(response) {
      this.message = response.message;
      this.successful = (response.status == 200)
    });
  }

  update(data, socket) {
    socket.client.emit("taskUpdate", { body: data });
    socket.$subscribe('response', function(response) {
      this.message = response.message;
      this.successful = (response.status == 200)
    });
  }

  delete(id, socket) {
    socket.client.emit("taskDelete", { id: id });
  }

  deleteAll(socket) {
    socket.client.emit("tasksDelete");
  }

  findExecuted(socket) {
    socket.client.emit('tasks_all', { filter: 'executed' });
    socket.$subscribe('tasksList', function(response) {
      this.tasks = response.data;
    });
  }

  findUnexecuted(socket) {
    socket.client.emit('tasks_all', { filter: 'unexecuted' });
    socket.$subscribe('tasksList', function(response) {
      this.tasks = response.data;
    });
  }
}

export default new TaskDataService();
