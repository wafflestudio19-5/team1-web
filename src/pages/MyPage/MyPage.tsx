import React from "react";
import MyInfo from "./MyInfo/MyInfo";

import styles from "./MyPage.module.scss";
import MyPageTab from "./MyPageTab/MyPageTab";
import { useLocation } from "react-router";
import ProfileButtons from "./ProfileButtons/ProfileButtons";

const MyPage = () => {
  const qs = new URLSearchParams(useLocation().search);
  const tab: string | null = qs.get("tab");
  return (
    <div className={styles.myPage}>
      <ProfileButtons />
      <MyInfo />
      <MyPageTab mode={tab} />
    </div>
  );
};

export default MyPage;
