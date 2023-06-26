
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUpForm from './SignUp.js';
import Home from './Home.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;


