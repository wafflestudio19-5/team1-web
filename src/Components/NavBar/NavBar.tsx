import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import styles from './NavBar.module.scss';

type NavBarProps = {
  noLeftBarPage: Array<string>;
};

const NavBar: React.FC<NavBarProps> = ({ noLeftBarPage }) => {
  const location = useLocation();
  const mode: string = location.pathname.split('/')[1];

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        {noLeftBarPage.includes(mode) ? <div>leftBar</div> : null}
        <Link to="/">Logo</Link>
        <ul className={styles.menuList}>
          <li>About</li>
          <li>Products</li>
          <li>
            <Link to="/questions">Questions</Link>
          </li>
        </ul>
        <input className={styles.searchBox} />
        <div className={styles.buttonList}>
          <button className={`${styles.navBarButton} ${styles.loginButton}`}>
            <Link to="/login">Log in</Link>
          </button>
          <button className={`${styles.navBarButton} ${styles.signupButton}`}>
            <Link to="/register">Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
