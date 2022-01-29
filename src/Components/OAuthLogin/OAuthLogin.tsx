import React from "react";

import styles from "./OAuthLogin.module.scss";

const OAuthLogin = () => {
  return (
    <div className={styles.oAuthLogin}>
      <a
        className={`${styles.oAuthLoginButton} ${styles.google}`}
        href={"https://waffleoverflow.shop/oauth2/authorization/google"}
      >
        <span>Log in with Google</span>
      </a>
    </div>
  );
};

export default OAuthLogin;
