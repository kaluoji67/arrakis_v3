import React from "react";
import Header from "./components/includes/Header";
import Body from "./components/Body";
import { Route, Routes } from 'react-router-dom';
import LoginForm from "./components/auth/LoginForm";
import Footer from "./components/includes/Footer";
import { useState } from "react";


const App = () => {
  const [currentUser,setCurrentUser] = useState(null);
  const setUser = ( loggedInUser ) => {
    setCurrentUser (loggedInUser);
  }

  
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">

          <div className="header-container">
            <Header info={currentUser}/>
          </div>

          <div className="content-container">
            <Routes>
              <Route path="/" element={<Body info={currentUser}/>} />
              <Route path="/body" element={<Body info={currentUser} setUser={setUser} />} />
              <Route path="/login" element={<LoginForm info={setUser} />} />
            </Routes>
          </div>

          <div className="footer-container">
            <Footer />
          </div>

        </div>
      </div>
    </>
  )
};

export default App;
