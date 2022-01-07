import React from "react";

import styles from "./MyPageProfileDetail.module.scss";
import { Link } from "react-router-dom";

const MyPageProfileDetail = () => {
  return (
    <div className={styles.myPageProfileDetail}>
      <div className={styles.detailBox}>
        <span className={styles.title}>About</span>
        <div className={styles.detailInfo}>
          <span>
            our about me section is currently blank. Would you like to add one?
          </span>

          <Link className={styles.goEdit} to={"/mypage?tab=settings"}>
            Edit profile
          </Link>
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
