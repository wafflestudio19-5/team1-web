import React from "react";
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
}> = ({ user, date, isQuestion = false }) => {
  return (
    <div className={styles.activity}>
      <span className={styles.action}>
        {isQuestion ? "asked" : "answered"} <ReactTimeAgo date={date} />
      </span>
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
