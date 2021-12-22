import React from "react";

import styles from "./MyPageProfileDetail.module.scss";

const MyPageProfileDetail = () => {
  return (
    <div className={styles.myPageProfileDetail}>
      <div className={styles.detailBox}>
        <span className={styles.title}>About</span>
        <div className={styles.detailInfo}>
          Your about me section is currently blank. Would you like to add one?{" "}
          <br />
          Edit profile
        </div>
      </div>

      <div className={styles.detailBox}>
        <span className={styles.title}>Badges</span>
      </div>

      <div className={styles.detailBox}>
        <span className={styles.title}>Posts</span>
        <div className={styles.detailInfo}></div>
      </div>
    </div>
  );
};

export default MyPageProfileDetail;
