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
      query: `mutation($name: String!, $description: String, $date: Date, $status: Boolean, $file: String){
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
    return http.post("/tasks", dataql, { headers: authHeader() });
  }

  update(data) {
    let dataql = {
      query: `mutation($id: Int!, $name: String!, $description: String, $date: Date, $status: Boolean, $file: String){
        update(id: $id, name: $name, description: $description, date: $date, status: $status, file: $file)
      }`,
      variables: {
        id: data.id,
        name: data.name,
        description: data.description,
        file: data.file,
        status: data.status,
        date: data.date
      }
    }
    return http.post('/', dataql);
  }

  delete(id) {
    let dataql = {
      query: `mutation($id: Int!) {
        delete(id: $id)
      }`,
      variables: {
        id: id
      }
    }
    return http.post('/', dataql);
  }

  deleteAll() {
    let dataql = {
      query: `mutation{
        deleteAll
      }`
    }
    return http.post('/', dataql, { headers: authHeader() });
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
