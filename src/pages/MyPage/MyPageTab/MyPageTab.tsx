import React from "react";

import styles from "./MyPageTab.module.scss";
import { Link } from "react-router-dom";

type MyPageTabProps = {
  mode: string | null;
};

const MyPageTab: React.FC<MyPageTabProps> = ({ mode }) => {
  return (
    <div className={styles.myPageTab}>
      <Link to={"/users/me?tab=profile"}>
        <span
          className={`${styles.tabList} ${
            mode === "profile" ? styles.selected : ""
          }`}
        >
          Profile
        </span>
      </Link>
      {/*
      <Link to={"/users/me?tab=activity"}>
        <span
          className={`${styles.tabList} ${
            mode === "activity" ? styles.selected : ""
          }`}
        >
          Activity
        </span>
      </Link>
        */}
      <Link to={"/mypage?tab=settings"}>
        <span
          className={`${styles.tabList} ${
            mode === "settings" ? styles.selected : ""
          }`}
        >
          Settings
        </span>
      </Link>
    </div>
  );
};

export default MyPageTab;
