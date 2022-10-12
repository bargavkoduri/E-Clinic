import Home from './pages/home/index'
import Signin from './pages/signin/index'
import Signup from './pages/signup'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path='/signin' element={<Signin/>} exact/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;