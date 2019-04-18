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

  static fetchAnswer(questionId, answerId) {
    let baseUrl = this.defaultBaseUrl();

    return new Promise(function (resolve, redect) {
      const token = document.getElementsByName("csrf-token")[0].getAttribute("content");
      axios.defaults.headers.common["X-CSRF-Token"] = token;
      axios.put(baseUrl + `/questions` + `/${questionId}` + `/${answerId}`, )
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data))
    })
  }
}

export default QuestionApi
