import React from "react";

import styles from "./ProfileButtons.module.scss";
import { Link } from "react-router-dom";

const ProfileButtons = () => {
  return (
    <div className={styles.profileButtons}>
      <Link to={"?tab=settings"}>
        <button className={styles.profileButton}>Edit profile</button>
      </Link>
    </div>
  );
};

export default ProfileButtons;
