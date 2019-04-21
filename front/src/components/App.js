import React, {Component} from 'react'
import socketio from 'socket.io-client'
import Question from './Question'
import QuestionApi from "../api/question";
import Cookies from 'js-cookie';

const socket = socketio.connect('http://localhost:3005')
const users = JSON.parse(document.getElementById('users').value)
const userOptions = users.map((n) => (
        <option key={n.id} value={n.name}>
            {n.name}
        </option>
    )
  );
Cookies.remove('user_name');
Cookies.remove('question_number');
const user_name = Cookies.get('user_name') ? Cookies.get('user_name') : 'guest';
const question_number = Cookies.get('question_number') ? Cookies.get('question_number') : 1;

class App extends Component {
  constructor(props) {
    super(props)
    console.log(user_name)
    this.state = {
      userName: user_name,
      question: {question: ''},
      questionNumber: 1,
      answerNumber: 0,
      isQuestion: true,
      isAnswer: false
    }
  }

  componentDidMount() {
    this.fetchQuestion(question_number)

    socket.on('nextQuestion', (obj) => {
      //WebSocketサーバーからnextQuestionを受け取った際の処理
      console.log('obj=' + JSON.stringify(obj));
      Cookies.set('question_number', obj.question.id);
      const question_number = Cookies.get('question_number');
      this.setState({
          userName: this.state.userName,
          question: obj,
          questionNumber: question_number,
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
    Cookies.set('user_name', name);
    const user_name = Cookies.get('user_name');
    this.setState({
      userName: user_name
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
    let alphabet = ['A', 'B', 'C', 'D']

    for (let [index, answer] of answers.entries()) {
      answersComponents.push(
        <li key={answer.id} onClick={() => this.handleAnswerNumber(index + 1)} className='answer-list'><span>{alphabet[index]}:</span> {answer.content}</li>
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
        <div>
            <div>
              {this.state.userName != 'guest' &&
                <div>
                  <p id='userName' className="text-center">{this.state.userName}のチャレンジ</p>
                  {this.state.isQuestion &&
                    <Question
                      question={this.state.question}
                      answerNumber={this.state.answerNumber}
                      showAnswers={(value) => this.showAnswers(value)}
                      answerQuestion={(value) => this.answerQuestion(value)}
                    />
                }
                {this.state.isAnswer &&
                  <div>
                    {this.state.questionNumber != 2 &&
                      <h1 className="text-center">次の質問まで少々お待ちください</h1>
                    }
                    {this.state.questionNumber == 2 &&
                      <div className="text-center">
                        <h1>お疲れ様です！終了です！</h1>
                        <p>結果発表までお待ち下さい</p>
                        <a href='/' className="btn btn-primary">新郎新婦から</a>
                      </div>
                    }
                  </div>
                }
                </div>
              }
              {this.state.userName == 'guest' &&
              <div>
                <div className="question-content-area">ようこそ{this.state.userName}様、下の選択肢から自分の名前を選んでください。</div>
                <div className="user-select-area">
                  <select className='btn'
                          onChange={(e) => this.setStateUser(e.target.value)}>
                          <option value='選択してください' className="default-select">選択してください</option>
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
