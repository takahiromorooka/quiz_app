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

app.use('/public', express.static('./public'))
//クライアントにアクセスさせたい情報をapp.useに格納している
app.get('/',(req,res) => {
    res.redirect(302, '/public')
})
//クライアントからの要求があったときに一時的にpublicの内容を渡す

const socketio = require('socket.io')
const io = socketio.listen(server)
//WebSocketサーバーの設定

io.on('connection',(socket) => {
// //ユーザーが接続してきた時の処理
//     socket.on('testFunction', (comment) => {
//         io.emit('testFunction', comment)
//     })
//     console.log('Access to User:', socket.client.id)
//     socket.on('chatMessage',(msg) => {
//         //メッセージ受信時の処理
//         console.log('message',msg)
//         io.emit('chatMessage',msg)
//         //全てのユーザーにメッセージを送信
//     })

})
