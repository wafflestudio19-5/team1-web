import React, { FC } from "react";

import styles from "./MyInfo.module.scss";
import { useSessionContext } from "../../../contexts/SessionContext";

import dummyProfile from "../../../icons/dummyProfile.svg";

const MyInfo: FC = () => {
  const { userInfo } = useSessionContext();
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
