import React from "react";
import MyInfo from "./MyInfo/MyInfo";

import styles from "./MyPage.module.scss";
import MyPageTab from "./MyPageTab/MyPageTab";
import { Navigate, useLocation } from "react-router";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import MyPageProfile from "./MyPageProfile/MyPageProfile";
import { useSessionContext } from "../../contexts/SessionContext";

const MyPage = () => {
  const qs = new URLSearchParams(useLocation().search);
  const { userInfo } = useSessionContext();
  const tab: string = qs.get("tab") ?? "profile";
  return userInfo !== null ? (
    <div className={styles.myPage}>
      <ProfileButtons />
      <MyInfo />
      <MyPageTab mode={tab} />
      {/*tab === "settings" && <Settings />// TODO: edit profile*/}
      {tab === "profile" && <MyPageProfile />}
    </div>
  ) : (
    <Navigate to={"/questions"} />
  );
};

export default MyPage;
