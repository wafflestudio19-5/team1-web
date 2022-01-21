import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";
import dummyProfile from "../../icons/dummyProfile.svg";
import ReactTimeAgo from "react-time-ago";
import dayjs from "dayjs";

const UserCard: React.FC<{
  user: User;
  date: Date;
  isQuestion?: boolean;
  isEdited: boolean;
  edited?: Date;
  questionId?: number;
}> = ({ user, date, isQuestion = false, isEdited, edited, questionId }) => {
  const daysBetween = new Date().getDate() - new Date(date).getDate();
  const dayFormat =
    dayjs(date).format(" YY/MM/DD") + " at " + dayjs(date).format("HH:mm");
  const editedDayFormat = edited
    ? dayjs(edited).format(" YY/MM/DD") + " at " + dayjs(edited).format("HH:mm")
    : null;

  return (
    <div className={styles.activity}>
      {isQuestion ? (
        <div className={styles.date}>
          {isEdited && (
            <span className={styles.action}>edited {editedDayFormat}</span>
          )}
          <Link to={`/questions/${questionId}`} className={styles.action}>
            asked {daysBetween < 1 ? <ReactTimeAgo date={date} /> : dayFormat}
          </Link>
        </div>
      ) : (
        <div className={styles.date}>
          {isEdited && (
            <span className={styles.action}>edited {editedDayFormat}</span>
          )}
          <span className={styles.action}>
            answered
            {daysBetween < 1 ? <ReactTimeAgo date={date} /> : dayFormat}
          </span>
        </div>
      )}
      <div>
        <img
          src={dummyProfile}
          alt="profile_image"
          className={styles.profileImage}
        />
        <Link to={`/users/${user.id}`} className={styles.name}>
          {user.username}
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
