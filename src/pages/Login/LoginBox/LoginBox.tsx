import React, { useState } from "react";

import styles from "./LoginBox.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import BlueButton from "../../../Components/BlueButton/BlueButton";
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
  const { signin } = useSessionContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  };

  const submit = async () => {
    if (
      !loginInfo.email.match(
        /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    )
      toast.error("Invalid email format");
    else if (loginInfo.password === "") toast.error("Password is empty");
    else
      try {
        await signin(loginInfo.email, loginInfo.password);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            if (e.response.status === 401) {
              toast.error("Invalid email or password");
            } else if (e.response.status === 400) {
              toast.error("Invalid email format");
            } else {
              toast.error(e.response.data.status + " " + e.response.data.error);
            }
            toast.error(e.response.status, e.response.data);
          }
        } else {
          console.error(e);
        }
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
        name={"email"}
        type={"email"}
        value={loginInfo.email}
        onChange={onChange}
      />
      <LabelInput
        title={"Password"}
        name={"password"}
        type={"password"}
        value={loginInfo.password}
        onChange={onChange}
      />

      <div className={styles.buttonBox}>
        <BlueButton type={"submit"} text={"Log in"} onClick={submit} />
      </div>
    </form>
  );
};

export default LoginBox;
