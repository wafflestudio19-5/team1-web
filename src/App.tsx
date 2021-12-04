import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import LeftBar from "./Components/LeftBar/LeftBar";
import NavBar from "./Components/NavBar/NavBar";
import Ask from "./pages/Ask/Ask";
import Login from "./pages/Login/Login";
import Question from "./pages/Question/Question";
import Questions from "./pages/Questions/Questions";
import Register from "./pages/Register/Register";
import "./App.css";

const noLeftBarPage = ["register", "login"];

const App: React.FC = () => {
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
              <Route path="/questions/:id/:title" element={<Question />} />
              <Route path="/questions/ask" element={<Ask />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
