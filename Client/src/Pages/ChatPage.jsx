import React, { useState, useEffect } from "react";
import "../Styles/ChatPage.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Components/Message";
import { socket } from "../Services/Socket";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const [notif, setNotif] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();

  // Whenever 'socket' changes - new emit/on this renders again
  useEffect(() => {
    // Sending from client now when this page gets rendered
    socket.emit("newUser", id);

    //Display arrival of a new user
    socket.on("announceUsername", (msg) => {
      setNotif(msg);
    });

    // Displaying messages
    socket.on("sentNewMsg", (msg) => {
      console.log(msg);
      setMessageList((messageList) => messageList.concat(msg));
    });

    // Display user disconnected
    socket.on("userDisconnected", (msg) => {
      console.log("The msg: ", msg);
      setNotif(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const btnClick = () => {
    // Should send the socketID/username along with this
    const messageData = {
      message: message,
      username: id,
      socketID: socket.id,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    // Appears on sender's chat window as well
    setMessageList((messageList) => messageList.concat(messageData));
    // Allows for the appearance on receiver's chat window
    socket.emit("newMsg", messageData);
    setMessage("");
  };

  return (
    <div className="container">
      <div className="chat-header">
        <h2>Chat App</h2>
      </div>
      <h5>{notif}</h5>

      <div>
        {messageList.map((messageData, count) => {
          return (
            <div key={count}>
              <Message messageData={messageData} socket={socket} />
            </div>
          );
        })}
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Send message here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={btnClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
