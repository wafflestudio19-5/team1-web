import styles from "./QuestionItem.module.scss";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import TagItem from "../../../Components/TagItem/TagItem";
import {
  countVotes,
  isAnswered,
  QuestionInterface,
} from "../../../interface/interface";
import UserCard from "../../../Components/UserCard/UserCard";
import MDEditor from "@uiw/react-md-editor";

interface QuestionItemProps {
  question: QuestionInterface;
}

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  const questionSummary = useMemo(
    () => question.body.substring(0, 100),
    [question]
  );
  return (
    <div className={styles.questionItem}>
      <div className={styles.sideBar}>
        <div className={styles.numberBox}>
          <div className={styles.number}>{countVotes(question)}</div>
          <div className={styles.label}>votes</div>
        </div>
        <div
          className={`${styles.numberBox} ${
            isAnswered(question) ? styles.answered : ""
          }`}
        >
          <div className={styles.number}>{question.answers.length}</div>
          <div className={styles.label}>answers</div>
        </div>
      </div>
      <div className={styles.titleBox}>
        <h3>
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
        </h3>
        {/* <p>{questionSummary}</p> */}
        <MDEditor.Markdown
          className={questionSummary}
          source={questionSummary}
        />
        <div className={styles.itemFooter}>
          <div className={styles.tagList}>
            {question.tags.map((tag) => (
              <TagItem key={tag.id} tag={tag.name} />
            ))}
          </div>
          <div className={styles.activityContainer}>
            <UserCard
              user={question.user}
              timestamp={question.createdAt}
              isQuestion={true}
              isEdited={question?.updatedAt ? true : false}
              questionId={question.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
