import styles from "./QuestionItem.module.scss";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import TagItem from "../../../Components/TagItem/TagItem";
import { isAnswered, QuestionInterface } from "../../../interface/interface";
import UserCard from "../../../Components/UserCard/UserCard";
import RemoveMarkdown from "remove-markdown";

interface QuestionItemProps {
  question: QuestionInterface;
}

const useQuestionSummary = (markdown: string) => {
  return useMemo(() => {
    const pureText = RemoveMarkdown(markdown);
    return pureText.length > 100
      ? pureText.substring(0, 100) + "..."
      : pureText;
  }, [markdown]);
};

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  const questionSummary = useQuestionSummary(question.body);
  return (
    <div className={styles.questionItem}>
      <div className={styles.sideBar}>
        <div className={styles.numberBox}>
          <div className={styles.number}>{question.vote}</div>
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
        <p>{questionSummary}</p>
        <div className={styles.itemFooter}>
          <div className={styles.tagList}>
            {question.tags.map((tag) => (
              <TagItem key={tag.id} tag={tag.name} />
            ))}
          </div>
          <div className={styles.activityContainer}>
            <UserCard
              user={question.user}
              date={new Date(question.createdAt + "Z")}
              isQuestion={true}
              isEdited={false}
              questionId={question.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
