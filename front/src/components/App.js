import React, {Component} from 'react'
import socketio from 'socket.io-client'

import QuestionApi from "../api/question";

const socket = socketio.connect('http://localhost:3005')

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: {question: ''},
            questionNumber: 1,
            answerNumber: '',
            isQuestion: true,
            isAnswer: false
        }
        //このcomponentで扱う配列logsの初期値を設定する
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

    handleAnswerNumber(number) {
        console.log(number)
        this.setState({
            answerNumber: number
        })
    }

    componentDidMount() {
        this.fetchQuestion(this.state.questionNumber)

        socket.on('nextQuestion', (obj) => {
            //WebSocketサーバーからchatMessageを受け取った際の処理
            console.log(obj)
            this.setState({
                question: obj,
                isQuestion: true,
                isAnswer: false,
            })
        })

    }

    showAnswers(answers) {
        let answersComponents = []

        for (let [index, answer] of answers.entries()) {
            answersComponents.push(
                <li key={answer.id} onClick={() => this.handleAnswerNumber(index + 1)}>{answer.content}</li>
            )
        }
        return answersComponents
    }

    answerQuestion() {
        this.setState({
            isAnswer: true,
            isQuestion: false
        })
    }

    render() {

        return (
            <div>
                <h1>問題</h1>
                    <div>
                        {this.state.isQuestion &&
                            <div>
                                <p>{this.state.question.question.content}</p>
                                <ol>
                                    {this.state.question.question ? this.showAnswers(this.state.question.question.answers) : ''}
                                </ol>
                                <div className='btn btn-primary' onClick={() => this.answerQuestion()}>回答する</div>
                            </div>
                        }
                        {this.state.isAnswer && <div>次の質問まで少々お待ちください</div>}
                    </div>
            </div>
        )
    }
}

export default App
