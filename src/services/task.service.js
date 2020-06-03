class TaskDataService {
  getAll(socket) {
    socket.client.emit("tasks_all", { filter: '' });
  }

  get(id, socket) {
    socket.client.emit("task", { id: id });
  }

  create(data, socket) {
    socket.client.emit("taskCreate", { body: data });
  }

  update(data, socket) {
    socket.client.emit("taskUpdate", { body: data });
  }

  delete(id, socket) {
    socket.client.emit("taskDelete", { id: id });
  }

  deleteAll(socket) {
    socket.client.emit("tasksDelete");
  }

  findExecuted(socket) {
    socket.client.emit('tasks_all', { filter: 'executed' });
  }

  findUnexecuted(socket) {
    socket.client.emit('tasks_all', { filter: 'unexecuted' });
  }
}

export default new TaskDataService();
