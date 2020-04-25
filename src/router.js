import Vue from "vue";
import Router from "vue-router";
import Login from './components/Login.vue';
import Register from './components/Register.vue';

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
      path: "/add",
      name: "add",
      component: () => import("./components/Task")
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/Profile.vue')
    }
  ]
});
