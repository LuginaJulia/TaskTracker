class AuthService {
  login(socket, user) {
    socket.client.emit("signin", {
      username: user.username,
      password: user.password
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
