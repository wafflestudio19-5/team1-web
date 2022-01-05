import React, { useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LeftBar from "./Components/LeftBar/LeftBar";
import NavBar from "./Components/NavBar/NavBar";
import Ask from "./pages/Ask/Ask";
import Edit from "./pages/Edit/Edit";
import Login from "./pages/Login/Login";
import Question from "./pages/Question/Question";
import Questions from "./pages/Questions/Questions";
import Register from "./pages/Register/Register";
import "./App.css";
import { api } from "./api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyPage from "./pages/MyPage/MyPage";

const noLeftBarPage = ["register", "login"];

const App: React.FC = () => {
  // TODO: remove this on release
  useEffect(() => {
    api
      .ping()
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  });
  return (
    <>
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
                <Route path="/posts/:id/edit" element={<Edit />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/" element={<Navigate to="/questions" />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
