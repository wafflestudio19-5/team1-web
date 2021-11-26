import React from "react";

import styles from "./Labelnput.module.scss";

type LabelInputProps = {
  title: string;
  name: string;
  isPassword: boolean;
  isFirst: boolean;
  value: string;
  onChange(args: React.ChangeEvent<HTMLInputElement>): void;
};

const LabelInput: React.FC<LabelInputProps> = ({
  title,
  name,
  isPassword,
  isFirst,
  value,
  onChange,
}) => {
  return (
    <div className={`${styles.labelInput} ${isFirst ? null : styles.notFirst}`}>
      <label className={styles.inputTitle} htmlFor={"email"}>
        {title}
      </label>
      <input
        className={styles.loginInput}
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
