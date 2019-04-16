const express = require('express')
const app = express()
const server = require('http').createServer(app)
//httpサーバーの作成
//const server = createServer(app)でもサーバーは作成できるが、expressのサーバーを動かすとなると多くのmoduleが必要になる。
//httpだけであれば必要最低限の構成でサーバーを起動できる

const portNumber = 3005
//番号はなんでも良いが、他で使用している番号と重ならないように注意

server.listen(portNumber, () => {
    console.log('起動しました', 'http://localhost' + portNumber)
})
//サーバーの起動時、端末にポート番号を表示する。
//そうすることで、コピー＆ペーストによって簡単にブラウザからチャットに接続できる。

const socketio = require('socket.io')
const io = socketio.listen(server)
//WebSocketサーバーの設定

io.on('connection',(socket) => {

    socket.on('nextQuestion',(question) => {
        console.log(`Server`, question);
        io.emit('nextQuestion', question)
        //全てのユーザーにメッセージを送信
    })


})
