import styles from "./QuestionItem.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface Question {
  id: number;
  title: string;
  votes: number;
  answersCount: number;
  tags: string[];
  recentHistory: string;
}

interface QuestionItemProps {
  question: Question;
}

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  const recentHistoryDom = (
    <div className={styles.RecentHistory}>{question.recentHistory}</div>
  );
  return (
    <div className={styles.QuestionItem}>
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
      <div className={styles.TitleBox}>
        <h3>
          <Link to={`/questions/${question.id}/`}>{question.title}</Link>
        </h3>
        <div className={styles.TitleBottom}>
          <ul className={styles.TagList}>
            {question.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {recentHistoryDom}
        </div>
      </div>
    </div>
  );
};
