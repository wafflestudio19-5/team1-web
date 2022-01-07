import React from "react";

import styles from "./MyInfo.module.scss";
import { useSessionContext } from "../../../contexts/SessionContext";

const MyInfo = () => {
  const { userInfo } = useSessionContext();
  return (
    <div className={styles.myInfo}>
      <img
        className={styles.profileImg}
        src={
          "https://www.gravatar.com/avatar/c7dce3957212482f3c931cce947e69e2?s=256&d=identicon&r=PG"
        }
        alt={"profile_image"}
        height={128}
        width={128}
      />
      <div className={styles.infoDetail}>
        <span className={styles.userName}>{userInfo?.username}</span>
      </div>
    </div>
  );
};

export default MyInfo;
