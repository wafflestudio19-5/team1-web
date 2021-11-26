import React, { useEffect, useState } from "react";

import styles from "./Questions.module.scss";
import { Link } from "react-router-dom";
import { Question, QuestionItem } from "./QuestionItem/QuestionItem";

const dummyQuestions: Question[] = [
  {
    id: 1,
    title: "Lorem Ipsum",
    votes: +5,
    answersCount: 0,
    tags: ["react"],
    recentHistory: "asked 1 mins ago",
  },
  {
    id: 2,
    title: "Foo Bar Baz",
    votes: -2,
    answersCount: 1,
    tags: ["nodejs"],
    recentHistory: "asked 16 mins ago",
  },
];

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    setQuestions(dummyQuestions);
  });

  return (
    <div className={styles.Questions}>
      <div className={styles.TopBar}>
        <h1>Top Questions</h1>
        <Link to="/questions/ask" className={styles.AskQuestionButton}>
          Ask Question
        </Link>
      </div>
      <ul className={styles.FilterList}>
        <li>Interesting</li>
        <li>Hot</li>
        <li>Week</li>
        <li>Month</li>
      </ul>
      <div className={styles.QuestionList}>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
