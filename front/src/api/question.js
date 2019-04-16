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
}

export default QuestionApi
