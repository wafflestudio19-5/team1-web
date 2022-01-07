import React from "react";
import styles from "./BlueButton.module.scss";

type BlueButtonProps = {
  text: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  type?: "button" | "submit" | "reset";
};

const BlueButton: React.FC<BlueButtonProps> = ({ type, text, onClick }) => {
  return (
    <button
      type={type ? `${type}` : "button"}
      className={styles.blueButton}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BlueButton;
