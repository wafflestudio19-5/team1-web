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
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt={"logo"}
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
