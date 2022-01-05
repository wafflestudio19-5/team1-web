import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";
import dummyProfile from "../../icons/dummyProfile.svg";

const UserCard: React.FC<{
  user: User;
  timestamp: string;
  isQuestion?: boolean;
  isEdited: boolean;
  questionId?: number;
}> = ({ user, timestamp, isQuestion = false, isEdited, questionId }) => {
  const date = new Date(timestamp);
  return (
    <div className={styles.activity}>
      {isQuestion ? (
        <Link to={`/questions/${questionId}`} className={styles.action}>
          asked at {date.toDateString()}
        </Link>
      ) : (
        <span className={styles.action}>answered at {date.toDateString()}</span>
      )}
      <div>
        <img
          src={dummyProfile}
          alt="profile_image"
          className={styles.profileImage}
        />
        {/*
        <Link to={`/users/${user.id}`} className={styles.name}>
          {user.username}
        </Link>
          */}
        <span className={styles.name}>{user.username}</span>
      </div>
    </div>
  );
};

export default UserCard;
