import React from "react";

const Message = ({ messageData, socket }) => {
  return (
    <div id={messageData.socketID === socket.id ? "left" : "right"}>
      <div className="msg_content">
        <p>{messageData.message}</p>
      </div>

      <div className="msg_username">
        <p>{messageData.username}</p>
      </div>
    </div>
  );
};

export default Message;
