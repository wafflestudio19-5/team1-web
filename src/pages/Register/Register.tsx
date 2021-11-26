import React, { useState } from "react";

import styles from "./Register.module.scss";
import OAuthLogin from "../../Components/OAuthLogin/OAuthLogin";
import LabelInput from "../../Components/LabelInput/LabelInput";
import { Link } from "react-router-dom";
import BlueButton from "../../Components/BlueButton/BlueButton";

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newRegisterInfo = { ...registerInfo, [name]: value };
    setRegisterInfo(newRegisterInfo);
  };

  const submit = (e: React.MouseEvent<HTMLElement>) => {
    // submit
  };

  return (
    <div className={styles.register}>
      <OAuthLogin />
      <div className={styles.registerBox}>
        <LabelInput
          title={"Display name"}
          name={"name"}
          isPassword={false}
          isFirst={true}
          value={registerInfo.name}
          onChange={onChange}
        />
        <LabelInput
          title={"Email"}
          name={"email"}
          isPassword={false}
          isFirst={false}
          value={registerInfo.email}
          onChange={onChange}
        />
        <LabelInput
          title={"Password"}
          name={"password"}
          isPassword={true}
          isFirst={false}
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
  //Todo
};

export default Register;
