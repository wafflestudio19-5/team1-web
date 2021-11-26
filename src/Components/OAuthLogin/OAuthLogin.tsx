import React from "react";

import styles from "./OAuthLogin.module.scss";
import Login from "../../pages/Login/Login";

const OAuthLogin = () => {
  return (
    <div className={styles.oAuthLogin}>
      <button className={`${styles.oAuthLoginButton} ${styles.google}`}>
        <span>Login in with Google</span>
      </button>
      <button className={`${styles.oAuthLoginButton} ${styles.github}`}>
        <span>Login in with Github</span>
      </button>
      <button className={`${styles.oAuthLoginButton} ${styles.facebook}`}>
        <span>Login in with Facebook</span>
      </button>
    </div>
  );
};

export default OAuthLogin;
