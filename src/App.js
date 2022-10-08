import Home from './components/home'
import Signin from './components/signin'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path='/signin' element={<Signin/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;