import React from "react";

import styles from "./Login.module.scss";
import OAuthLogin from "../../Components/OAuthLogin/OAuthLogin";
import LoginBox from "./LoginBox/LoginBox";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.login}>
      <img
        className={styles.logoImage}
        src={
          "data:image/png;base64,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"
        }
      />
      <OAuthLogin />
      <LoginBox />

      <div className={styles.additional}>
        <span>
          <span>Don’t have an account? </span>
          <Link className={styles.linkToRegister} to={"/register"}>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
