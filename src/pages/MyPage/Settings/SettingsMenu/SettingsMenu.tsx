import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./SettingsMenu.module.scss";

interface SettingsMenuProps {}

export const SettingsMenu: FC<SettingsMenuProps> = ({}) => {
  return (
    <ul className={styles.SettingsMenu}>
      <li className={styles.header}>PERSONAL INFORMATION</li>
      <li className={styles.item}>
        {/* TODO: change url */}
        <Link to={`/mypage?tab=settings`}>Edit profile</Link>
      </li>
    </ul>
  );
};
