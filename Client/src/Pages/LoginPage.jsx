import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => navigate(`/chat/${username}`)}>Start</button>
    </div>
  );
};

export default LoginPage;
