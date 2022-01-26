import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./LeftBar.module.scss";

type LeftBarProps = {
  noLeftBarPage: Array<string>;
};

const LeftBar: React.FC<LeftBarProps> = ({ noLeftBarPage }) => {
  const location = useLocation();
  const mode: string = location.pathname.split("/")[1];

  return noLeftBarPage.includes(mode) ? null : (
    <div className={styles.leftBar}>
      <ul className={styles.menuList}>
        <li className={styles.menu}>
          <span className={styles.menuText}>
            <Link to="/">Home</Link>
          </span>
        </li>
        <li className={`${styles.menu} ${styles.hasSub}`}>PUBLIC</li>
        <ul className={styles.subMenuList}>
          <li
            className={`${styles.subMenu} ${
              mode === "questions" ? styles.selected : ""
            }`}
          >
            <Link to="/questions">Questions</Link>{" "}
          </li>
          <li
            className={`${styles.subMenu} ${
              mode === "users" ? styles.selected : ""
            }`}
          >
            <Link to="/users">Users</Link>{" "}
          </li>

          {/* <li className={styles.subMenu}>Tags</li>
          <li className={styles.subMenu}>Users</li> */}
        </ul>

        {/*
        <li className={styles.menu}>COLLECIVES</li>
        */}
      </ul>
    </div>
  );
};

export default LeftBar;
