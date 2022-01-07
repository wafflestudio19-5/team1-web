import React, { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { useSessionContext } from "../../contexts/SessionContext";
import { toast } from "react-toastify";

type NavBarProps = {
  noLeftBarPage: Array<string>;
};

const NavBar: React.FC<NavBarProps> = () => {
  useLocation();
  const { signout, userInfo } = useSessionContext();
  const navigate = useNavigate();
  const onSignoutButton = useCallback(() => {
    const doIt = async () => {
      try {
        await signout();
      } catch (e) {
        console.error(e);
      }
      navigate("/login");
      toast.info("signed out");
    };
    doIt().then();
  }, [navigate, signout]);

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              className={styles.logoImage}
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt={"logo"}
            />
            <label>
              waffle <strong>overflow</strong>
            </label>
          </Link>
        </div>
        <ul className={styles.menuList}>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
        {/* <input className={styles.searchBox} /> */}
        {!userInfo ? (
          <div className={styles.buttonList}>
            <Link
              className={`${styles.navBarButton} ${styles.loginButton}`}
              to="/login"
            >
              Log in
            </Link>
            <Link
              className={`${styles.navBarButton} ${styles.signupButton}`}
              to="/register"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className={styles.buttonList}>
            <Link
              to={"/mypage?tab=profile"}
              className={`${styles.navBarButton} ${styles.profileButton}`}
            >
              {userInfo.username}
            </Link>
            <button
              className={`${styles.navBarButton} ${styles.signoutButton}`}
              onClick={onSignoutButton}
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
