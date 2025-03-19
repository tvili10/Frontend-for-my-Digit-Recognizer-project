
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recognizer from "./pages/Recognizer";
import Training from "./pages/Training";
import Info from "./pages/Info";
import Navbar from './components/Navbar';




function App() {
  return (
    <Router draggable="false">
      <Navbar/>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Recognizer />} />
          <Route path="/training" element={<Training />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
