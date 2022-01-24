import React, { FC } from "react";

import styles from "./MyInfo.module.scss";

import dummyProfile from "../../../icons/dummyProfile.svg";
import { UserInfoResponse } from "../../../interface/interface";

interface MyInfoProps {
  userInfo: UserInfoResponse;
}

const MyInfo: FC<MyInfoProps> = ({ userInfo }) => {
  return userInfo ? (
    <div className={styles.myInfo}>
      <img
        className={styles.profileImg}
        src={dummyProfile}
        alt={"profile"}
        height={128}
        width={128}
      />
      <div className={styles.infoDetail}>
        <span className={styles.userName}>{userInfo?.username}</span>
      </div>
    </div>
  ) : null;
};

export default MyInfo;
