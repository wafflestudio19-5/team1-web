import React, { useState } from "react";

import styles from "./Register.module.scss";
import OAuthLogin from "../../Components/OAuthLogin/OAuthLogin";
import LabelInput from "../../Components/LabelInput/LabelInput";
import { Link, Navigate } from "react-router-dom";
import BlueButton from "../../Components/BlueButton/BlueButton";
import { useSessionContext } from "../../contexts/SessionContext";
import axios from "axios";
import { toast } from "react-toastify";

type RegisterInfo = {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });
  const { userInfo, signup } = useSessionContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newRegisterInfo = { ...registerInfo, [name]: value };
    setRegisterInfo(newRegisterInfo);
  };

  const submit = async () => {
    try {
      await signup(
        registerInfo.name,
        registerInfo.email,
        registerInfo.password
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          if (e.response.status === 400) {
            toast.error("Invalid email format");
          } else if (e.response.status === 401) {
            toast.error("Invalid email or password");
          } else if (e.response.status === 409) {
            toast.error("User name already exists");
          } else {
            console.log(e.response.status, e.response.data);
          }
        }
      } else {
        console.log(e);
      }
    }
  };

  return userInfo ? (
    <Navigate to={"/questions"} />
  ) : (
    <div className={styles.register}>
      <img
        className={styles.logoImage}
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt={"logo"}
      />
      <OAuthLogin />
      <div className={styles.registerBox}>
        <LabelInput
          title={"Display name"}
          name={"name"}
          isPassword={false}
          value={registerInfo.name}
          onChange={onChange}
        />
        <LabelInput
          title={"Email"}
          name={"email"}
          isPassword={false}
          value={registerInfo.email}
          onChange={onChange}
        />
        <LabelInput
          title={"Password"}
          name={"password"}
          isPassword={true}
          value={registerInfo.password}
          onChange={onChange}
        />
        <BlueButton text={"Sign up"} onClick={submit} />
      </div>
      <div className={styles.additional}>
        <span>Already have an account? </span>
        <Link className={styles.linkToLogin} to={"/login"}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
