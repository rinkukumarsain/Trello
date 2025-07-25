import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Board from './components/board/Board.jsx';
import BoardDetail from './components/board/BoardDetail.jsx';
import Login from "./components/register/Login.jsx";
import Signup from "./components/register/Signup.jsx";
import Footer from "./components/pages/Footer.jsx";
// import Drop from "./components/drag/drop.jsx"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />  {/* All boards list */}
        <Route path="/board/:id" element={<BoardDetail />} />

        {/* <Route path="/activity" element={<Activity />} /> */}
        {/* <Route path="/label" element={<Label />} /> */}
      </Routes>

    <Footer />
    </Router>
    
  );
};

export default App;
