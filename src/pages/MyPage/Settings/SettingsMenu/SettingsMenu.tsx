import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./SettingsMenu.module.scss";

interface SettingsMenuProps {}

enum SETTINGS_MENU_ITEM {}

export const SettingsMenu: FC<SettingsMenuProps> = ({}) => {
  const selectedMenu = SETTINGS_MENU_ITEM;
  return (
    <ul className={styles.SettingsMenu}>
      <li className={styles.header}>PERSONAL INFORMATION</li>
      <li
        className={`${styles.item} ${
          selectedMenu === SETTINGS_MENU_ITEM ? styles.selected : ""
        }`}
      >
        <Link to={`/users/me?tab=settings`}>Edit profile</Link>
      </li>
    </ul>
  );
};
