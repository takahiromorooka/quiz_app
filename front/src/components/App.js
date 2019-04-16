import React,{Component} from 'react'
import socketio from 'socket.io-client'
import Form from './Form'
import QuestionApi from "../api/question";

const socket = socketio.connect('http://localhost:3005')

class App  extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: '',
            answers: [],
            questionNumber: 1,
            answerNumber: ''
        }
        //このcomponentで扱う配列logsの初期値を設定する
    }

    fetchQuestion(questionId) {
        QuestionApi.fetchQuestion(questionId)
            .then((data) =>{
                console.log(data)
                this.setState({
                    question: data,
                    answers: data['answers']
                })
            })
            .catch((error) => {
                alert('エラーが発生しました。')
                console.log(error)
            })
    }

    handleAnswerNumber(number) {
        this.setState({
            answerNumber: number
        })
    }

    sendAnwerNumber () {

    }

    componentDidMount(){
        this.fetchQuestion(this.state.questionNumber)

        socket.on('testFunction', (obj) => {
            const commentLogs = this.state.commentLogs
            obj.key = 'key_' + (this.state.commentLogs.length + 1)
            commentLogs.unshift(obj)
            console.log(obj)
            console.log('testFunction')
            this.setState({
                comment: commentLogs
            })
        })

        //このコンポーネントがDOMによって読み込まれた後の処理を設定する
        socket.on('chatMessage',(obj) => {
            //WebSocketサーバーからchatMessageを受け取った際の処理
            const logs2 = this.state.logs
            obj.key = 'key_' + (this.state.logs.length + 1)
            logs2.unshift(obj)
            this.setState({logs: logs2})
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

    }

    render(){
    //     const messages = this.state.logs.map(e => (
    //         <div key={e.key}>
    // <span>{e.name}</span>
    //     <span>: {e.message}</span>
    //     <p />
    //     </div>
    // ))
    //     const comment = this.state.commentLogs.map(e => (
    //         <div key={e.key}>
    // <span>{e.comment}</span>
    //     <p />
    //     </div>
    // ))

        //ログの設定。今までのname、messageをkeyごとに表示する
        return(
            <div>
            <h1 id='title'>問題</h1>
            <p>{this.state.question.content}</p>
                <ol>
                    {this.showAnswers(this.state.answers)}
                </ol>
            </div>
        )
    }
}

export default App
