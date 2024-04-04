import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Register from "../src/Components/Register/Register";
import React from "react";
import Home from "../src/Components/Home/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        {/* <Route path="/register" exact element={<Register/>}/>
        <Route path="/home" exact element={<Home/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
