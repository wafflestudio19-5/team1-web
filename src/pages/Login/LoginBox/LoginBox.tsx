import React, { useState } from "react";

import styles from "./LoginBox.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import { Navigate } from "react-router";
import { useSessionContext } from "../../../contexts/SessionContext";
import axios from "axios";
import { toast } from "react-toastify";

type LoginInfo = {
  [key: string]: string;
  email: string;
  password: string;
};

const LoginBox = () => {
  // const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const { userInfo, signin } = useSessionContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  };

  const submit = async () => {
    try {
      await signin(loginInfo.email, loginInfo.password);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          console.log(e.response.data);
          if (e.response.status === 401) {
            toast.error("Invalid email or password");
          }
        }
      } else {
        console.log(e);
      }
    }
  };

  if (userInfo) return <Navigate to={"/questions"} />;

  return (
    <form
      className={styles.loginBox}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <LabelInput
        title={"Email"}
        name={"email"}
        isPassword={false}
        value={loginInfo.email}
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
        <BlueButton text={"Log in"} onClick={submit} />
      </div>
    </form>
  );
};

export default LoginBox;
