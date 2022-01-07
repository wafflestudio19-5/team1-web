import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";
import dummyProfile from "../../icons/dummyProfile.svg";
import ReactTimeAgo from "react-time-ago";

const UserCard: React.FC<{
  user: User;
  date: Date;
  isQuestion?: boolean;
  isEdited: boolean;
  questionId?: number;
}> = ({ user, date, isQuestion = false, questionId }) => {
  return (
    <div className={styles.activity}>
      {isQuestion ? (
        <Link to={`/questions/${questionId}`} className={styles.action}>
          asked <ReactTimeAgo date={date} />
        </Link>
      ) : (
        <span className={styles.action}>
          answered <ReactTimeAgo date={date} />
        </span>
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
