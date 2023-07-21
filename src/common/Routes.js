import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import SignUpForm from "../components/SignUp/SignUpForm";
import Home from "../components/Home/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LoginForm} />
        <Route exact path="/signUp" Component={SignUpForm} />
        <Route exact path="/home" Component={Home}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
