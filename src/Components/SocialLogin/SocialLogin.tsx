import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { _setAccessToken } from "../../api/api";
import { useSessionContext } from "../../contexts/SessionContext";

const SocialLogin = () => {
  const token = new URLSearchParams(useLocation().search).get("token");

  const { refreshMyProfile } = useSessionContext();

  const navigate = useNavigate();
  if (token) {
    _setAccessToken(token.split(" ")[1]);
    refreshMyProfile().then();

    navigate("/");
  } else {
    toast.error("다시 시도해주세요", { autoClose: 3000 });
    navigate("/login");
  }

  return <div></div>;
};

export default SocialLogin;
