import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardList from "./components/CardList.jsx";
// import TrelloInterface from './components/TrelloInterface.jsx';
// import Board from './components/Board.jsx';
// import Activity from './components/Activity.jsx';
// import Label from './components/Label.jsx';
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/board" element={<Board />} /> */}
        
        <Route path="/card" element={<CardList />} />

        {/* <Route path="/activity" element={<Activity />} /> */}
        {/* <Route path="/label" element={<Label />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
