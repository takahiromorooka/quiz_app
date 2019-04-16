import React,{Component} from 'react'
import socketio from 'socket.io-client'
import Form from './Form'

const socket = socketio.connect('http://localhost:3005')

class App  extends Component {
    constructor(props){
        super(props)
        this.state = {
            logs: [],
            commentLogs: []
        }
        //このcomponentで扱う配列logsの初期値を設定する
    }
    componentDidMount(){
        // socket.on('testFunction', (obj) => {
        //     const commentLogs = this.state.commentLogs
        //     obj.key = 'key_' + (this.state.commentLogs.length + 1)
        //     commentLogs.unshift(obj)
        //     console.log(obj)
        //     console.log('testFunction')
        //     this.setState({
        //         comment: commentLogs
        //     })
        // })
        // //このコンポーネントがDOMによって読み込まれた後の処理を設定する
        // socket.on('chatMessage',(obj) => {
        //     //WebSocketサーバーからchatMessageを受け取った際の処理
        //     const logs2 = this.state.logs
        //     obj.key = 'key_' + (this.state.logs.length + 1)
        //     logs2.unshift(obj)
        //     this.setState({logs: logs2})
        // })

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
                <h1 id='title'>Reactチャット</h1>
                <Form />
                <div id='log'>{messages}</div>
                <div>{comment}</div>
            </div>
        )
    }
}

export default App
