import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from './components/Calender';
import Home from './components/Home';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </Router>
  );
}

export default App;
