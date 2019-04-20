import React, {Component} from 'react'
import socketio from 'socket.io-client'
import Question from './Question'
import QuestionApi from "../api/question";

const socket = socketio.connect('http://localhost:3005')
const users = JSON.parse(document.getElementById('users').value)
const userOptions = users.map((n) => (
        <option key={n.id} value={n.name}>
            {n.name}
        </option>
    )
  );

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'guest',
      question: {question: ''},
      questionNumber: 1,
      answerNumber: 0,
      isQuestion: true,
      isAnswer: false
    }
  }

  componentDidMount() {
    console.log('question_id=' + this.state.questionNumber)
    this.fetchQuestion(this.state.questionNumber)

    socket.on('nextQuestion', (obj) => {
      //WebSocketサーバーからchatMessageを受け取った際の処理
      console.log('obj=' + JSON.stringify(obj));
      this.setState({
          userName: this.state.userName,
          question: obj,
          questionNumber: obj.question.id,
          answerNumber: 0,
          isQuestion: true,
          isAnswer: false,
      })
    })
  }

  startQuestion(name) {
    let baseUrl = this.defaultBaseUrl();
    axios.get(baseUrl + '/questions/1',)
  }

  setStateUser(name) {
    this.setState({
      userName: name
    })
  }

  fetchQuestion(questionId) {
    QuestionApi.fetchQuestion(questionId)
      .then((data) => {
        console.log(data)
        this.setState({
            question: {question: data}
        })
      })
      .catch((error) => {
        alert('エラーが発生しました。')
        console.log(error)
    })
  }

  showAnswers(answers) {
    let answersComponents = []

    for (let [index, answer] of answers.entries()) {
      answersComponents.push(
        <li key={answer.id} onClick={() => this.handleAnswerNumber(index + 1)} className='answer-list'>{answer.content}</li>
      )
    }
    return answersComponents
  }

  handleAnswerNumber(number) {
    console.log(number)
    this.setState({
        answerNumber: number
    })
  }

  answerQuestion(answerNumber) {
    QuestionApi.fetchAnswer(this.state.questionNumber, answerNumber, this.state.userName)
      .then((data) => {
        this.setState({
          isAnswer: true,
          isQuestion: false
        })
      })
      .catch((error) => {
        alert('エラーが発生しました 。')
        console.log(error)
    })


  }


  render() {
    return (
      <div>
        <h1>MILLIONAIRE</h1>
          <div>
              <div>
                {this.state.userName != 'guest' &&
                  <div>
                    <p id='userName'>{this.state.userName}</p>
                    {this.state.isQuestion &&
                      <Question
                        question={this.state.question}
                        questionNumber={this.state.questionNumber}
                        answerNumber={this.state.answerNumber}
                        showAnswers={(value) => this.showAnswers(value)}
                        answerQuestion={(value) => this.answerQuestion(value)}
                      />
                  }
                  {this.state.isAnswer && <div>次の質問まで少々お待ちください</div>}
                  </div>
                }
                {this.state.userName == 'guest' &&
                <div>
                  <p>ようこそ{this.state.userName}様、下の選択肢から自分の名前を選んでください。</p>
                  <div>
                    <select className='btn btn-primary'
                            onChange={(e) => this.setStateUser(e.target.value)}>
                            <option/>
                            {userOptions}
                    </select>
                  </div>
                </div>
                }
              </div>
          </div>
      </div>
    )
  }
}

export default App
