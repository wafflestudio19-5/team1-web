import React from "react";

import styles from "./Labelnput.module.scss";

type LabelInputProps = {
  title: string;
  name: string;
  value: string;
  type: "password" | "text" | "email";
  onChange(args: React.ChangeEvent<HTMLInputElement>): void;
};

const LabelInput: React.FC<LabelInputProps> = ({
  title,
  name,
  value,
  onChange,
  type,
}) => {
  return (
    <div className={styles.labelInput}>
      <label className={styles.inputTitle} htmlFor={name}>
        {title}
      </label>
      <input
        className={styles.loginInput}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelInput;
