import React, { useState } from "react";

import styles from "./LoginBox.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import { useNavigate } from "react-router";
import { dummyApi } from "../../../api/dummyApi";

type LoginInfo = {
  [key: string]: string;
  userName: string;
  password: string;
};

const LoginBox = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    userName: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  };

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      await dummyApi.signin(loginInfo.userName, loginInfo.password);
      navigate("/mypage?tab=profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={styles.loginBox}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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

      <div className={styles.buttonBox}>
        <BlueButton text={"Login in"} onClick={submit} />
      </div>
    </form>
  );
};

export default LoginBox;
