import React, { useState, useEffect } from "react";
import "../Styles/ChatPage.css";
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
      setMessageList((messageList) => messageList.concat(msg));
      setMessage("");
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
    socket.emit("newMsg", `${id}: ${message}`);
  };

  return (
    <div className="container">
      <h2>Chat App</h2>
      <h5>{notif}</h5>

      <div className="chatMessages">
        {messageList.map((message, count) => {
          return <div key={count}>{message}</div>;
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
