import React from "react";
import styles from "./BlueButton.module.scss";

type BlueButtonProps = {
  text: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
};

const BlueButton: React.FC<BlueButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.blueButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;
