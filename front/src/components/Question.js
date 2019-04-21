import React, {Component} from 'react'
import socketio from 'socket.io-client'

const socket = socketio.connect('http://localhost:3005')

function Question ({question, answerNumber, showAnswers, answerQuestion}) {
  return (
      <div>
        <div>
          <div>
            <p>{question.question.content}</p>
            <ol>
                {question.question ? showAnswers(question.question.answers) : ''}
            </ol>
            <div>{answerNumber == 0 ? '' : 'あなたの回答は' + answerNumber + 'でよろしいでしょうか？'}</div>
            <div className='btn btn-primary' onClick={() => answerQuestion(answerNumber)}>final answer!</div>
          </div>
        </div>
      </div>
    )
  }
export default Question
