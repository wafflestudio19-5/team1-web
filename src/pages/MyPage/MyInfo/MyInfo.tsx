import React from "react";

import styles from "./MyInfo.module.scss";

const MyInfo = () => {
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
        <span className={styles.userName}>Day</span>
        <ul className={styles.dayInfos}>
          <li>Member for 6 days/</li>
          <li>Last seen this week/</li>
          <li>Visited 6 days, 6 consecutive/</li>
        </ul>
      </div>
    </div>
  );
};

export default MyInfo;
