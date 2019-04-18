import React,{Component} from 'react'
import socketio from 'socket.io-client'
import Form from './Form'

const socket = socketio.connect('http://localhost:3005')

class App  extends Component {
    constructor(props){
        super(props)
        this.state = {
            questions: [],
            answers: []
        }
        //このcomponentで扱う配列logsの初期値を設定する
    }
    componentDidMount(){
    }

    render(){
        const messages = this.state.logs.map(e => (
            <div key={e.key}>
                <span>{e.name}</span>
                <span>: {e.message}</span>
                <p />
            </div>
        ))
        const comment = this.state.commentLogs.map(e => (
            <div key={e.key}>
                <span>{e.comment}</span>
                <p />
            </div>
        ))
        //ログの設定。今までのname、messageをkeyごとに表示する
        return(
            <div>
                <h1 id='title'>MILLIONAIRE</h1>
                {this.state.questions}
                {/*<Form />*/}
                {/*<div id='log'>{messages}</div>*/}
                {/*<div>{comment}</div>*/}
            </div>
        )
    }
}

export default App
