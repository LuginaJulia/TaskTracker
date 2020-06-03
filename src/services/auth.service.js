class AuthService {
  login(socket, user) {
    socket.client.emit("signin", {
      username: user.username,
      password: user.password
    });
    socket.$subscribe('signinResponse', function(response) {
      this.message = response.message;
      if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(socket, user) {
    socket.client.emit("signup", {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
