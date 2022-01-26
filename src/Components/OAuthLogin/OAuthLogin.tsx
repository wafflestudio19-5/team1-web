import React from "react";

import styles from "./OAuthLogin.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const OAuthLogin = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.oAuthLogin}>
      <button
        className={`${styles.oAuthLoginButton} ${styles.google}`}
        onClick={async () => {}}
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
