import React, {Component} from 'react'
import socketio from 'socket.io-client'

const socket = socketio.connect('http://localhost:3005')

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            message: '',
            comment: ''
        }
    }

    nameChanged(e) {
        this.setState({name: e.target.value})
    }

    messageChanged(e) {
        this.setState({message: e.target.value})
    }

    commentChanged(e) {
        this.setState({comment: e.target.value})
    }


    send() {
        // socket.emit('chatMessage', {
        //     name: this.state.name,
        //     message: this.state.message
        // })
        //
        // socket.emit('testFunction', {
        //     comment: this.state.comment
        // })
        this.setState({
            message: '',
            comment: ''
        })
    }

    //このイベント発生時、socket.io-clientがlocahostにnameとmessageの値が入ったchatMessageを全てのユーザーに送信する。
    //その後、messageの値だけを初期値に戻す。

    render() {
        return (
            <div id='Form'>
                <div className='Name'>
                    名前:
                    <br/>
                    <input value={this.state.name} onChange={e => this.nameChanged(e)}/>
                </div>
                <br/>
                <div className='Message'>
                    メッセージ:
                    <br/>
                    <input value={this.state.message} onChange={e => this.messageChanged(e)}/>
                </div>
                <div className='Comment'>
                    コメント:
                    <br/>
                    <input value={this.state.comment} onChange={e => this.commentChanged(e)}/>
                </div>
                <button className='send' onClick={e => this.send()}>送信</button>
            </div>
        )
    }
}

export default Form
