import {FC} from "react";
import styles from "./ActivityComponent.module.scss";
import {Link} from "react-router-dom";
import {Question} from "../QuestionItem/QuestionItem";

export const ActivityComponent: FC<{ question: Question }> = ({question}) => {
  const date = new Date(question.last_activity.timestamp);
  return (
      <div className={styles.activity}>
        <Link
          to={`/questions/${question.id}/?lastactivity`}
          className={styles.action}
        >
          {question.last_activity.action} at {date.toDateString()}
        </Link>
        <div>
          <img
            src={question.last_activity.user.image}
            alt={"profile image"}
            className={styles.profileImage}
          />
          <Link
            to={`/users/${question.last_activity.user.id}`}
            className={styles.name}
          >
            {question.last_activity.user.name}
          </Link>
        </div>
      </div>
  );
};