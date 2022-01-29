import React, { FC } from "react";

import styles from "./MyPageProfile.module.scss";
import MyStats from "./MyStats/MyStats";
import MyPageProfileDetail from "./MyPageProfileDetail/MyPageProfileDetail";
import { UserInfoResponse } from "../../../interface/interface";

const MyPageProfile: FC<{ userInfo: UserInfoResponse; me: boolean }> = ({
  userInfo,
  me,
}) => {
  return (
    <div className={styles.myPageProfile}>
      <MyStats userInfo={userInfo} />
      <MyPageProfileDetail userInfo={userInfo} me={me} />
    </div>
  );
};

export default MyPageProfile;
