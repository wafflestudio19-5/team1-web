import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { _setAccessToken } from "../../api/api";
import { useSessionContext } from "../../contexts/SessionContext";
import { BeatLoader } from "react-spinners";
import styles from "../../pages/Questions/Questions.module.scss";
import React, { useEffect } from "react";
import axios from "axios";

const SocialLogin = () => {
  const token = new URLSearchParams(useLocation().search).get("token");

  const { refreshMyProfile } = useSessionContext();

  const navigate = useNavigate();

  useEffect(() => {
    const doIt = async () => {
      try {
        if (token) {
          _setAccessToken(token);
          await refreshMyProfile();
          navigate("/");
        } else {
          toast.error("다시 시도해주세요", { autoClose: 3000 });
          navigate("/login");
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.status === 401) {
            toast.error("invalid token");
            navigate("/login");
          } else console.error(e);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [navigate, refreshMyProfile, token]);

  return (
    <div className={styles.loaderContainer}>
      <BeatLoader />
    </div>
  );
};

export default SocialLogin;
