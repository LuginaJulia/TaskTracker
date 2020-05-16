import TaskService from "../services/task.service";
import Task from "../models/task";

const initialState = { status: { success: false }, task: null };

export const task = {
  namespaced: true,
  state: initialState,
  actions: {
    create({ commit }, task) {
      return TaskService.create(task).then(
        response => {
          commit('success');
          return Promise.resolve(response.data);
        },
        error => {
          commit('failure');
          return Promise.reject(error);
        }
      );
    },
    update({ commit }, task) {
      return TaskService.update(task.id, task).then(
        response => {
          commit('success');
          return Promise.resolve(response.data);
        },
        error => {
          commit('failure');
          return Promise.reject(error);
        }
      );
    },
    find({ commit }, { socket, id }) {
      TaskService.get(id, socket);
      socket.$subscribe('taskForm', function(response) {
        commit('findSuccess', response.data);
        Promise.resolve(response.data);
      });
    }
  },
  mutations: {
    findSuccess(state, task) {
      state.status.success = true;
      state.task = new Task({ 
        id: task.id, 
        name: task.name, 
        description: task.description, 
        file: task.file, 
        date: task.date, 
        status: task.status });
      console.log('success');
    },
    findFailure(state) {
      state.status.success = false;
    },
    success(state) {
      state.status.success = true;
    },
    failure(state) {
      state.status.success = false;
    },
  }
};
