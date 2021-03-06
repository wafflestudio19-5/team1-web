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
import "react-confirm-alert/src/react-confirm-alert.css";
import MyPage from "./pages/MyPage/MyPage";
import Users from "./pages/Users/Users";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import SocialLogin from "./Components/SocialLogin/SocialLogin";

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
                <Route path="/questions/:id" element={<Question />} />
                <Route path="/questions/ask" element={<Ask />} />
                <Route path="/posts/:id/edit" element={<Edit />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<MyPage />} />
                <Route path="/social" element={<SocialLogin />} />
                <Route
                  path="/"
                  element={<Navigate to="/questions" replace />}
                />
                <Route path="/*" element={<ErrorPage />} />
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
