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
      component: () => import("./components/Task")
    },
    {
      path: "/tasks/new",
      name: "new-task",
      component: () => import("./components/Task")
    },
    {
      path: '/login',
      component: () => import("./components/Login")
    },
    {
      path: '/register',
      component: () => import("./components/Register")
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/Profile.vue')
    }
  ]
});
