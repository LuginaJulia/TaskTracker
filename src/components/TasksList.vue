<template>
  <div class="list row">
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
    {{message}}
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    </div>
    <div class="col-md-12">
      <button class="m-3 btn btn-sm btn-success" @click="executedTasks">
        Executed tasks
      </button>
      <button class="m-3 btn btn-sm btn-warning" @click="unexecutedTasks">
        Unexecuted tasks
      </button>
       <button class="m-3 btn btn-sm btn-light" @click="allTasks">
        Reset filter
      </button>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTasks">
        Remove All
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="index"
        >
          <th scope="row"> {{ task.id }} </th>
          <td> {{ task.name }} </td>
          <td> {{ dateFormat(task.date) }} </td>
          <td v-if="task.status">
            <button @click="reversed(task)" type="button" class="btn btn-success btn-sm">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
          </td>
          <td v-else>
            <button @click="checked(task)" type="button" class="btn btn-outline-success btn-sm">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
          </td>
          <td>
            <div class="col-md-12 mb-4">
              <a :href="'/tasks/' + task.id">
                <button type="button" class="btn btn-info btn-sm">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
              </a>
              
              <button @click="deleteTask(task)" type="button" class="btn btn-danger btn-sm">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import TaskDataService from "../services/task.service";
import moment from 'moment';

export default {
  name: "tasks-list",
  data: () => ({
    tasks: [],
    name: "",
    message: "",
    successful: ""
  }),

  methods: {
    retrieveTasks() {
      TaskDataService.getAll(this.$socket);
    },

    refreshList() {
      this.retrieveTasks();
    },

    removeAllTasks() {
      TaskDataService.deleteAll(this.$socket).then(
        async () => {
          await new Promise(r => setTimeout(r, 100));
          this.refreshList();
      });
    },
    
    executedTasks() {
      TaskDataService.findExecuted(this.$socket);
    },

    unexecutedTasks() {
      TaskDataService.findUnexecuted(this.$socket);
    },
    
    allTasks() {
      this.retrieveTasks();
    },

    deleteTask(task) {
      TaskDataService.delete(task.id, this.$socket).then(
        async () => {
        await new Promise(r => setTimeout(r, 100));
        this.refreshList();
      });
    },

    dateFormat(date){
      return (date) ? moment(date).format("Do MMMM YYYY") : '-';
    },

    reversed(task) {
      task.status = false;
      let socket = this.$socket;
      this.$store.dispatch('task/update', { socket, task }).then(
        async () => {
          await new Promise(r => setTimeout(r, 100));
          this.refreshList();
      });
    },

    checked(task) {
      task.status = true;
      let socket = this.$socket;
      this.$store.dispatch('task/update', { socket, task }).then(
        async () => {
          await new Promise(r => setTimeout(r, 100));
          this.refreshList();
      });
    }
  },

  mounted() {
    this.retrieveTasks();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>