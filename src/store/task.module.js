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
    find({ commit }, id) {
      return TaskService.get(id).then(
        response => {
          commit('findSuccess', response.data);
          return Promise.resolve(response.data);
        },
        error => {
          commit('findFailure');
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    findSuccess(state, task) {
      console.log(task);
      state.status.success = true;
      state.task = new Task({ 
        id: task.id, 
        name: task.name, 
        description: task.description, 
        file: task.file, 
        date: task.date, 
        status: task.status });
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
