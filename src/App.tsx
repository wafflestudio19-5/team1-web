import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LeftBar from "./Components/LeftBar/LeftBar";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Question from "./pages/Question/Question";
import Questions from "./pages/Questions/Questions";
import Register from "./pages/Register/Register";

const noLeftBarPage = ["register", "login"];

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar noLeftBarPage={noLeftBarPage} />
        <div className="appContent">
          <LeftBar noLeftBarPage={noLeftBarPage} />
          <div className="appPageViewer">
            <Routes>
              <Route path="/questions" element={<Questions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/question/:id" element={<Question />} />
              {/* <Route exact path="/question/ask" element={} /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
