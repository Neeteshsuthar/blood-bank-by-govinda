import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './tailwind.css';
import Myprovider from "./context/Myprovider";
import HomePage from "./components/home";
import Signup from "./components/Signup-Login";
import UpdateProfile from "./components/profile";
import SignIn from "./components/login";
import DonersData from "./components/done's";
import Contact from "./components/contact";


function App() {
  return (
    <Myprovider>
      
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/profile" element={<UpdateProfile/>}/>
          <Route path="/doner"  element={<DonersData/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      
    </Myprovider>
  );
}

export default App;

