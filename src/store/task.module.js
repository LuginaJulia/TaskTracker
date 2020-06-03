import TaskService from "../services/task.service";
import Task from "../models/task";

const initialState = { status: { success: false }, task: null };

export const task = {
  namespaced: true,
  state: initialState,
  actions: {
    create({ commit }, { socket, task }) {
      TaskService.create(task, socket)
      commit('success');
    },
    update({ commit }, { socket, task }) {
      TaskService.update(task, socket);
      commit('success');
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
