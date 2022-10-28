import Home from './pages/home/index'
import Signin from './pages/signin/index'
import Signup from './pages/signup'
import Patient from './pages/PatientPortal';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const UserContext = React.createContext()

function App() {
  const [user, setUser] = useState({ type: "", email: "", password: "" });
  const [data,setData] = useState({})
  return (
    <UserContext.Provider value={{user,setUser,data,setData}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />}  />
          <Route path="/signup" element={<Signup />} />
          <Route path='/patientportal' element={<Patient/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;