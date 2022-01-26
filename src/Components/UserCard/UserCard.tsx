import React from "react";

import { Link } from "react-router-dom";

import { User } from "../../interface/interface";

import styles from "./UserCard.module.scss";
import dummyProfile from "../../icons/dummyProfile.svg";
import ReactTimeAgo from "react-time-ago";
import { hoursBetween, dayFormat } from "../../hooks/hooks";

const UserCard: React.FC<{
  user: User;
  date: Date;
  isQuestion?: boolean;
  isEdited: boolean;
  edited?: Date | null;
  questionId?: number;
}> = ({ user, date, isQuestion = false, isEdited, edited, questionId }) => {
  const between = hoursBetween(date);
  const dateFormat = dayFormat(date);
  const editedDayFormat = edited ? dayFormat(edited) : null;

  return (
    <div className={styles.activity}>
      {isQuestion ? (
        <div className={styles.date}>
          {isEdited && (
            <span className={styles.action}>
              edited{" "}
              {between < 24 && edited ? (
                <ReactTimeAgo date={edited} />
              ) : (
                editedDayFormat
              )}
            </span>
          )}
          <Link to={`/questions/${questionId}`} className={styles.action}>
            asked {between < 24 ? <ReactTimeAgo date={date} /> : dateFormat}
          </Link>
        </div>
      ) : (
        <div className={styles.date}>
          {isEdited && (
            <span className={styles.action}>
              edited{" "}
              {between < 24 && edited ? (
                <ReactTimeAgo date={edited} />
              ) : (
                editedDayFormat
              )}
            </span>
          )}
          <span className={styles.action}>
            answered {between < 24 ? <ReactTimeAgo date={date} /> : dateFormat}
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
