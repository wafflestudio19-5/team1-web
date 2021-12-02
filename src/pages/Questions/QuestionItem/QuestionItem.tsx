import styles from "./QuestionItem.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../Tag/Tag";
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

// stackoverflow question url
const replace = (url: string) => {
    url = url.replaceAll(" ", "-").toLowerCase();
    if (url.length > 80) return url.substring(0, 80);
    else return url;
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
                        to={`/questions/${question.id}/${replace(
                            question.title
                        )}`}
                    >
                        {question.title}
                    </Link>
                </h3>
                <p>{question.summary}</p>
                <div className={styles.itemFooter}>
                    <div className={styles.tagList}>
                        {question.tags.map((tag) => (
                            <Tag key={tag} tag={tag} />
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
