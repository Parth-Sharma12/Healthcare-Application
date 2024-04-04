import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Register from "../src/Components/Register/Register";
import React from "react";
import Home from "../src/Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import ViewPosts from "./Components/ViewPosts/ViewPosts"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/ViewPosts" exact element={<ViewPosts/>}/>
        {/* <Route path="/register" exact element={<Register/>}/>
        <Route path="/home" exact element={<Home/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
