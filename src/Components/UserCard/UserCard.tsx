import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";

const UserCard: React.FC<{ user: User; timestamp: string }> = ({
  user,
  timestamp,
}) => {
  const date = new Date(timestamp);
  return (
    <div className={styles.activity}>
      <Link
        to={`/questions/${user?.id}/?lastactivity`}
        className={styles.action}
      >
        asked at {date.toDateString()}
      </Link>
      <div>
        <img
          src={user?.profile}
          alt="profile_image"
          className={styles.profileImage}
        />
        <Link to={`/users/${user?.id}`} className={styles.name}>
          {user?.name}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
