import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { useSessionContext } from "../../contexts/SessionContext";

type NavBarProps = {
  noLeftBarPage: Array<string>;
};

const NavBar: React.FC<NavBarProps> = () => {
  useLocation();
  const { signout, userInfo } = useSessionContext();

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        <Link to="/">
          <img
            className={styles.logoImage}
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt={"logo"}
          />
        </Link>
        <ul className={styles.menuList}>
          <li>About</li>
          <li>Products</li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
        <input className={styles.searchBox} />
        {!userInfo ? (
          <div className={styles.buttonList}>
            <button className={`${styles.navBarButton} ${styles.loginButton}`}>
              <Link to="/login">Log in</Link>
            </button>
            <button className={`${styles.navBarButton} ${styles.signupButton}`}>
              <Link to="/register">Sign up</Link>
            </button>
          </div>
        ) : (
          <div className={styles.buttonList}>
            <button
              className={`${styles.navBarButton} ${styles.profileButton}`}
            >
              <Link to={"/mypage"}>{userInfo.username}</Link>
            </button>
            <button
              className={`${styles.navBarButton} ${styles.signoutButton}`}
              onClick={signout}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
