import http from "../http-common";
import authHeader from "./auth-header";

class TaskDataService {
  getAll(socket) {
    socket.client.emit("tasks_all", { filter: '' });
    socket.$subscribe('tasksList', function(response) {
      this.tasks = response.data;
    });
  }

  get(id, socket) {
    socket.client.emit("task", { id: id });
    // socket.$subscribe('taskForm', function(response) {
    //   this.task = response.data;
    // });
    //return http.get(`/tasks/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/tasks", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/tasks/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/tasks`, { headers: authHeader() });
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
