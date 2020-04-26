import http from "../http-common";
import authHeader from "./auth-header";

class TaskDataService {
  getAll() {
    return http.get('/tasks');
  }

  get(id) {
    return http.get(`/tasks/${id}`, { headers: authHeader() });
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

  findExecuted() {
    return http.get('/tasks/executed');
  }

  findUnexecuted() {
    return http.get('/tasks/unexecuted');
  }
}

export default new TaskDataService();
