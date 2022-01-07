import React, { useEffect } from "react";
import MyInfo from "./MyInfo/MyInfo";

import styles from "./MyPage.module.scss";
import MyPageTab from "./MyPageTab/MyPageTab";
import { Navigate, useLocation } from "react-router";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import MyPageProfile from "./MyPageProfile/MyPageProfile";
import { useSessionContext } from "../../contexts/SessionContext";
import { Settings } from "./Settings/Settings";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const qs = new URLSearchParams(useLocation().search);
  const { userInfo, refreshMyProfile } = useSessionContext();
  const tab = qs.get("tab") ?? "profile";
  const navigate = useNavigate();
  useEffect(() => {
    const doIt = async () => {
      try {
        await refreshMyProfile();
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.status === 401) {
            toast.error("Please sign in first");
            navigate("/login");
          } else console.error(e.response.data);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [navigate, refreshMyProfile]);

  return userInfo !== null ? (
    <div className={styles.myPage}>
      <ProfileButtons />
      <MyInfo />
      <MyPageTab mode={tab} />
      {tab === "settings" && <Settings />}
      {tab === "profile" && <MyPageProfile />}
    </div>
  ) : (
    <Navigate to={"/questions"} />
  );
};

export default MyPage;
