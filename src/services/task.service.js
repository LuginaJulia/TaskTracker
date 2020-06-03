import http from "../http-common";
import authHeader from "./auth-header";

class TaskDataService {
  getAll() {
    let data = { query: 
      `{tasks{
        id
        name
        description
        file
        date
        status
      }}`
    }
    return http.post('/', data);
  }

  get(id) {
    let dataql = { query: 
      `{task(id: ${id}){
          id
          name
          description
          file
          date
          status
      }}`
    }
    return http.post(`/tasks/${id}`, dataql);
  }

  create(data) {
    let dataql = {
      query: `mutation($name: String!, $description: String, $date: String, $status: Boolean, $file: String){
        create(name: $name, description: $description, date: $date, status: $status, file: $file){
          id
          name
          description
          date
          file
          status
        }
      }`,
      variables: {
        name: data.name,
        description: data.description,
        file: data.file,
        status: data.status,
        date: data.date
      }
    }
    return http.post("/tasks", dataql);
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

  findByFilter(filter) {
    let data = { query: 
      `{filteredTasks(filter: ${filter}){
          id
          name
          description
          file
          date
          status
      }}`
    }
    return http.post('', data);
  }
}

export default new TaskDataService();
