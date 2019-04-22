import axios from 'axios'
import ApiBase from './apiBase'

class UserApi extends ApiBase {
  static fetchUser() {
    let baseUrl = this.defaultBaseUrl();

    return new Promise(function (resolve, reject) {
      axios.get(baseUrl + `/questions/users/entry`,)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data))
    })
  }
}

export default UserApi
