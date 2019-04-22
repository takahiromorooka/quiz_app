import axios from 'axios'
import ApiBase from './apiBase'

class QuestionApi extends ApiBase {

  static fetchQuestion(questionId) {
    let baseUrl = this.defaultBaseUrl();

    return new Promise(function (resolve, reject) {
      axios.get(baseUrl + `/questions/` + `${questionId}`,)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data))
    })
  }

  static fetchUser() {
    let baseUrl = this.defaultBaseUrl();

    return new Promise(function (resolve, reject) {
      axios.get(baseUrl + `/questions/users/entry`,)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data))
    })
  }

  static fetchAnswer(questionId, answerId, userName) {
    let baseUrl = this.defaultBaseUrl();

    return new Promise(function (resolve, reject) {
      const token = document.getElementsByName("csrf-token")[0].getAttribute("content");
      axios.defaults.headers.common["X-CSRF-Token"] = token;
      axios.put(baseUrl + `/questions` + `/${questionId}`,
          {
            question: {
              userName: `${userName}`,
              question_id: `${questionId}`,
              answer: `${answerId}`
            }
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data))
    })
  }
}

export default QuestionApi
