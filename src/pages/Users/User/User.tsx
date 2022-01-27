import React from "react";

import { Link } from "react-router-dom";

import { customizedImageLink, UserSummary } from "../../../interface/interface";
import dummyProfile from "../../../icons/dummyProfile.svg";
import answerType from "../../../icons/a.png";
import questionType from "../../../icons/q.png";

import styles from "./User.module.scss";

interface Props {
  user: UserSummary;
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.userImage}>
        <img
          className={styles.profile}
          alt={"profile"}
          src={customizedImageLink(user.image) ?? dummyProfile}
        />
      </div>
      <div className={styles.userDetail}>
        <Link to={`/users/${user.id}`} className={styles.username}>
          {user.username}
        </Link>
        <span className={styles.location}>{user.location}</span>
        <span className={styles.questionCnt}>
          <img src={questionType} alt={"question"} />
          {user.questionCount}
        </span>
        <span className={styles.answerCnt}>
          <img src={answerType} alt={"answer"} />
          {user.answerCount}
        </span>
      </div>
    </div>
  );
};

export default User;
