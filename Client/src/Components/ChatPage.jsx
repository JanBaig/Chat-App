import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";

const ChatPage = () => {
  const [socketInfo, setSocketInfo] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])
  var socket = io('http://localhost:3001');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`User ${socket.id} has connected! [Frontend]`)
      setSocketInfo(socket)
    })
  
  }, [])

  const sendMessage = () => {
    socket.emit('userMessage', message)

    socket.on('allUsers', (msg) => {
      setMessageList( messageList => messageList.concat(msg))
    })
    
  }

  return (
    <div>
      {messageList.map((msg, count) => {
        return (
          <div key={count}>
            {msg}
          </div>
        )
      })}
      <h2>Chat App</h2>
      <input type='text' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatPage