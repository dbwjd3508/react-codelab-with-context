
import { getMethod, postMethod } from '../utils/http';

class UserService {
  constructor(hostname) {
    this.hostname = hostname || 'localhost';
  }

  listuser(){
    return postMethod(
      '/user/listUser',
      {}
    );
  }

  login(name, email) {
    return postMethod(
      '/user/findUser',
      { name: name, email: email }
    );
  }

  logout() {
    return getMethod('/user/logout').then(() => window.location.href = '/Login');
  }
}
export default new UserService(window.location.hostname);
