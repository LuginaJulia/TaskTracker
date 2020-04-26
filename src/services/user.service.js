import http from "../http-common";

class UserService {
  getPublicContent() {
    return http.get('/test/all');
  }

  getUserBoard() {
    return http.get('/test/user');
  }
}

export default new UserService();
