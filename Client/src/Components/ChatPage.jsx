import React, { useState, useEffect } from "react";
import { socket } from "../Services/Socket";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const [notif, setNotif] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();

  socket.emit("sendToAll", "Welcome everyone!");

  useEffect(() => {
    socket.on("sendingToAll", (msg) => {
      setNotif(msg);
    });

    socket.on("sentNewMsg", (msg) => {
      setMessageList((messageList) => messageList.concat(msg));
      setMessage("");
    });
  }, [socket]);

  const btnClick = () => {
    socket.emit("newMsg", `${id}: ${message}`);
  };

  return (
    <div>
      <h2>Chat App</h2>
      <h5>{notif}</h5>
      <input
        type="text"
        placeholder="Send message here..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={btnClick}>Send</button>
      <ul>
        {messageList.map((message, count) => {
          return <li key={count}>{message}</li>;
        })}
      </ul>
    </div>
  );
};

export default ChatPage;
