<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>TaskTracker</a>
      <div class="navbar-nav mr-auto">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/tasks" class="nav-link">
              <font-awesome-icon icon="list" /> All task
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks/new" class="nav-link">
              <font-awesome-icon icon="plus" /> New task
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            TEST MODE <font-awesome-icon icon="user" />
          </router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
