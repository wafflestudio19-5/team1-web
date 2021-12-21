import { FC } from "react";
import styles from "./ActivityComponent.module.scss";
import { Link } from "react-router-dom";
import { QuestionInterface } from "../../../interface/interface";

export const ActivityComponent: FC<{ question: QuestionInterface }> = ({
  question,
}) => {
  const date = new Date(question.createdAt);
  return (
    <div className={styles.activity}>
      <Link
        to={`/questions/${question.id}/?lastactivity`}
        className={styles.action}
      >
        created at {date.toDateString()}
      </Link>
      <div>
        <img
          src={question.user.profile}
          alt={"profile"}
          className={styles.profileImage}
        />
        <Link to={`/users/${question.user.id}`} className={styles.name}>
          {question.user.name}
        </Link>
      </div>
    </div>
  );
};
