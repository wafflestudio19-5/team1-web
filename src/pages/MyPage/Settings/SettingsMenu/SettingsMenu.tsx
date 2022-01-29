import { FC } from "react";
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
        onClick={() => {
          setMode("edit");
        }}
      >
        <span>Edit profile</span>
      </li>
      <li
        className={`${styles.item} ${
          selectedMenu === "unregister" ? styles.selected : ""
        }`}
        onClick={() => {
          setMode("unregister");
        }}
      >
        <span>Delete profile</span>
      </li>
    </ul>
  );
};
