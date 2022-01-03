import React from "react";

import styles from "./Labelnput.module.scss";

type LabelInputProps = {
  title: string;
  name: string;
  isPassword: boolean;
  value: string;
  onChange(args: React.ChangeEvent<HTMLInputElement>): void;
};

const LabelInput: React.FC<LabelInputProps> = ({
  title,
  name,
  isPassword,
  value,
  onChange,
}) => {
  return (
    <div className={styles.labelInput}>
      <label className={styles.inputTitle} htmlFor={name}>
        {title}
      </label>
      <input
        className={`${styles.loginInput} ${
          isPassword ? styles.passwordInput : ""
        }`}
        type={isPassword ? "password" : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelInput;
