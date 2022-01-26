import React from "react";

import styles from "./OAuthLogin.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OAuthLogin = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.oAuthLogin}>
      <button
        className={`${styles.oAuthLoginButton} ${styles.google}`}
        onClick={() => {
          window.open(
            "https://waffleoverflow.shop/oauth2/authorization/google",
            "_blank"
          );
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
