
import React,{Component} from 'react'
import socketio from 'socket.io-client'
import QuestionApi from "../../../api/question";

const socket = socketio.connect('http://localhost:3005')

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: ''
        }
    }

    componentDidMount(){

    }

    fetchQuestion(questionId) {
        QuestionApi.fetchQuestion(questionId)
            .then((data) =>{
                this.setState({
                    question: data,
                })
            })
            .catch((error) => {
                alert('エラーが発生しました。')
                console.log(error)
            })
    }


    sendWebSocket(questionNumber) {
        this.fetchQuestion(questionNumber)

        setTimeout(() => {
            let question = this.state.question
            console.log(question)
            socket.emit('nextQuestion', {
                question
            })
        }, 100)

    }


    setQuestionButton () {
        let questionButtonComponents = []
        for( let i = 0; i < 10; i++ ) {
            questionButtonComponents.push(
                <div key={i}><input type="button" className={'btn btn-success mb-2'} value={`問題${i + 1}`} onClick={ () => this.sendWebSocket(i + 1) }/></div>)
        }
        return questionButtonComponents
    }




    render(){
        return(
            <div>
                <h1>Admin画面</h1>
                {this.setQuestionButton()}
            </div>
        )
    }
}

export default App
