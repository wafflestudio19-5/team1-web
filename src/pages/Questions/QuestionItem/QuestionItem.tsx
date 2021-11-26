import styles from "./QuestionItem.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../Tag/Tag";

interface RecentHistory {
  action: "asked" | "answered" | "modified";
  timestamp: string;
  user: {
    id: number;
    image: string;
    name: string;
  };
}

export interface Question {
  id: number;
  title: string;
  summary: string;
  votes: number;
  answersCount: number;
  tags: string[];
  last_activity: RecentHistory;
}

interface QuestionItemProps {
  question: Question;
}

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  return (
    <div className={styles.QuestionItem}>
      <div className={styles.SideBar}>
        <div className={styles.NumberBox}>
          <div className={styles.Number}>{question.votes}</div>
          <div className={styles.Label}>votes</div>
        </div>
        <div
          className={`${styles.NumberBox} ${
            question.answersCount ? styles.Answered : ""
          }`}
        >
          <div className={styles.Number}>{question.answersCount}</div>
          <div className={styles.Label}>answers</div>
        </div>
      </div>
      <div className={styles.TitleBox}>
        <h3>
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
        </h3>
        <p>{question.summary}</p>
        <div className={styles.ItemFooter}>
          <div className={styles.TagList}>
            {question.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <LastActivityComponent question={question} />
        </div>
      </div>
    </div>
  );
};

const LastActivityComponent: FC<{ question: Question }> = ({ question }) => {
  const date = new Date(question.last_activity.timestamp);
  return (
    <div className={styles.LastActivityContainer}>
      <div className={styles.LastActivity}>
        <Link
          to={`/questions/${question.id}/?lastactivity`}
          className={styles.Action}
        >
          {question.last_activity.action} at {date.toDateString()}
        </Link>
        <div>
          <img
            src={question.last_activity.user.image}
            alt={"profile image"}
            className={styles.ProfileImage}
          />
          <Link
            to={`/users/${question.last_activity.user.id}`}
            className={styles.Name}
          >
            {question.last_activity.user.name}
          </Link>
        </div>
      </div>
    </div>
  );
};
