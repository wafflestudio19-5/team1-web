import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";

const UserCard: React.FC<{
  user: User;
  timestamp: string;
  isQuestion?: boolean;
  isEdited: boolean;
}> = ({ user, timestamp, isQuestion = false, isEdited }) => {
  const date = new Date(timestamp);
  return (
    <div className={styles.activity}>
      <Link
        to={`/questions/${user.id}/?lastactivity`}
        className={styles.action}
      >
        {isQuestion
          ? `asked at ${date.toDateString()}`
          : `answered at ${date.toDateString()}`}
      </Link>
      <div>
        <img
          src={user?.profile}
          alt="profile_image"
          className={styles.profileImage}
        />
        <Link to={`/users/${user.id}`} className={styles.name}>
          {user.name}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
