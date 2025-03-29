import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/login/LoginForm';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <div className="App font-mono">
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<LoginForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;