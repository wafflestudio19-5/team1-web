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
        <Link to="/">
          <li className={styles.menu}>
            <span className={styles.menuText}>Home</span>
          </li>
        </Link>
        <li className={`${styles.menu} ${styles.hasSub}`}>PUBLIC</li>
        <ul className={styles.subMenuList}>
          <Link to={"/questions"}>
            <li
              className={`${styles.subMenu} ${
                mode === "questions" ? styles.selected : ""
              }`}
            >
              Questions
            </li>
          </Link>
          <Link to={"/users"}>
            <li
              className={`${styles.subMenu} ${
                mode === "users" ? styles.selected : ""
              }`}
            >
              Users
            </li>
          </Link>
        </ul>
      </ul>
    </div>
  );
};

export default LeftBar;
