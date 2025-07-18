import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Board from './components/board/Board.jsx';
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />        
        {/* <Route path="/activity" element={<Activity />} /> */}
        {/* <Route path="/label" element={<Label />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
