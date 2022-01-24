import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./SettingsMenu.module.scss";

interface SettingsMenuProps {
  mode: string;
  setMode(e: string): void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ mode, setMode }) => {
  const selectedMenu = mode;
  return (
    <ul className={styles.SettingsMenu}>
      <li className={styles.header}>PERSONAL INFORMATION</li>
      <li
        className={`${styles.item} ${
          selectedMenu === "edit" ? styles.selected : ""
        }`}
      >
        <span
          onClick={() => {
            setMode("edit");
          }}
        >
          Edit profile
        </span>
      </li>
      <li
        className={`${styles.item} ${
          selectedMenu === "unregister" ? styles.selected : ""
        }`}
      >
        <span
          onClick={() => {
            setMode("unregister");
          }}
        >
          Delete profile
        </span>
      </li>
    </ul>
  );
};
