import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
