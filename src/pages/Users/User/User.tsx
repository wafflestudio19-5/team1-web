import React from "react";

import { Link } from "react-router-dom";

import dummyProfile from "../../../icons/dummyProfile.svg";
import answerType from "../../../icons/a.png";
import questionType from "../../../icons/q.png";

import styles from "./User.module.scss";

interface UserProps {
  id: number;
  username: string;
  location: string | null;
  questionCount: number;
  answerCount: number;
}

interface Props {
  user: UserProps;
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img className={styles.profile} alt={"profile"} src={dummyProfile} />
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
