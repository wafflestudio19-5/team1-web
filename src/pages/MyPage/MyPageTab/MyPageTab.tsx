import React from "react";

import styles from "./MyPageTab.module.scss";
import { Link } from "react-router-dom";

type MyPageTabProps = {
  mode: string | null;
  me: boolean;
};

const MyPageTab: React.FC<MyPageTabProps> = ({ mode, me }) => {
  return (
    <div className={styles.myPageTab}>
      <Link to={"?tab=profile"}>
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
      {me && (
        <Link to={"?tab=settings"}>
          <span
            className={`${styles.tabList} ${
              mode === "settings" ? styles.selected : ""
            }`}
          >
            Settings
          </span>
        </Link>
      )}
    </div>
  );
};

export default MyPageTab;
