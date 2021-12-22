import React from "react";

import styles from "./MyPageProfile.module.scss";
import MyStats from "./MyStats/MyStats";
import MyPageProfileDetail from "./MyPageProfileDetail/MyPageProfileDetail";

const MyPageProfile = () => {
  return (
    <div className={styles.myPageProfile}>
      <MyStats />
      <MyPageProfileDetail />
    </div>
  );
};

export default MyPageProfile;
