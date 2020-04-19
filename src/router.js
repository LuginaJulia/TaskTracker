import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tasks",
      name: "tasks",
      component: () => import("./components/TasksList")
    },
    {
      path: "/tasks/:id",
      name: "task-details",
      component: () => import("./components/AddTask")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTask")
    }
  ]
});