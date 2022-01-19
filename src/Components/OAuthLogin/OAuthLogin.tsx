import React from "react";

import styles from "./OAuthLogin.module.scss";
import { toast } from "react-toastify";

const OAuthLogin = () => {
  return (
    <div className={styles.oAuthLogin}>
      <button
        className={`${styles.oAuthLoginButton} ${styles.google}`}
        onClick={() => {
          toast.error("coming soon!");
        }}
      >
        <span>Log in with Google</span>
      </button>
      {/*
      <button className={`${styles.oAuthLoginButton} ${styles.github}`}>
        <span>Log in with Github</span>
      </button>
      <button className={`${styles.oAuthLoginButton} ${styles.facebook}`}>
        <span>Log in with Facebook</span>
      </button>
      */}
    </div>
  );
};

export default OAuthLogin;
