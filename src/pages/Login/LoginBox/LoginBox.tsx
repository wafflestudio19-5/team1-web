import React, { useState } from "react";

import styles from "./LoginBox.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import BlueButton from "../../../Components/BlueButton/BlueButton";

type LoginInfo = {
  [key: string]: string;
  userName: string;
  password: string;
};

const LoginBox = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    userName: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  };

  const submit = (e: React.MouseEvent<HTMLElement>) => {
    // submit
  };

  return (
    <div className={styles.loginBox}>
      <LabelInput
        title={"Email"}
        name={"userName"}
        isPassword={false}
        value={loginInfo.userName}
        onChange={onChange}
      />
      <LabelInput
        title={"Password"}
        name={"password"}
        isPassword={true}
        value={loginInfo.password}
        onChange={onChange}
      />
      <BlueButton text={"Login in"} onClick={submit} />
    </div>
  );
};

export default LoginBox;
