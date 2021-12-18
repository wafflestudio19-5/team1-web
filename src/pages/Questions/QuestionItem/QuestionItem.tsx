import styles from "./QuestionItem.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import TagItem from "../../../Components/TagItem/TagItem";
import { ActivityComponent } from "../ActivityComponent/ActivityComponent";

interface Activity {
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
  last_activity: Activity;
}

interface QuestionItemProps {
  question: Question;
}

const makeTitleUrl = (title: string) => {
  return title
    .toLowerCase()
    .replaceAll(/[^\w]+/g, "-")
    .substring(0, 80);
};

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  return (
    <div className={styles.questionItem}>
      <div className={styles.sideBar}>
        <div className={styles.numberBox}>
          <div className={styles.number}>{question.votes}</div>
          <div className={styles.label}>votes</div>
        </div>
        <div
          className={`${styles.numberBox} ${
            question.answersCount ? styles.answered : ""
          }`}
        >
          <div className={styles.number}>{question.answersCount}</div>
          <div className={styles.label}>answers</div>
        </div>
      </div>
      <div className={styles.titleBox}>
        <h3>
          <Link
            to={`/questions/${question.id}/${makeTitleUrl(question.title)}`}
          >
            {question.title}
          </Link>
        </h3>
        <p>{question.summary}</p>
        <div className={styles.itemFooter}>
          <div className={styles.tagList}>
            {question.tags.map((tag) => (
              <TagItem key={tag} tag={tag} />
            ))}
          </div>
          <div className={styles.activityContainer}>
            <ActivityComponent question={question} />
          </div>
        </div>
      </div>
    </div>
  );
};
