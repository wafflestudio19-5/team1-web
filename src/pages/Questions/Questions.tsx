import React, { useEffect, useMemo, useState } from "react";

import styles from "./Questions.module.scss";
import { Link } from "react-router-dom";
import { Question, QuestionItem } from "./QuestionItem/QuestionItem";
import { useLocation } from "react-router";

interface QuestionQueryResponse {
  items: Question[];
  page_num: number;
  items_count: number;
  items_total: number;
}

const dummyResponse: QuestionQueryResponse = {
  items: [
    {
      id: 1,
      title: "Lorem Ipsum",
      votes: +5,
      answersCount: 0,
      tags: ["react", "react-dom"],
      recentHistory: "asked 1 mins ago",
    },
    {
      id: 2,
      title: "Foo Bar Baz",
      votes: -2,
      answersCount: 1,
      tags: ["nodejs", "typescript"],
      recentHistory: "asked 16 mins ago",
    },
  ],
  page_num: 1,
  items_count: 20,
  items_total: 2,
};

const getQuestions = async (
  page_num: number,
  items_count: number,
  filter: string
) => {
  console.log(filter);
  return dummyResponse;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Questions = () => {
  const query = useQuery();
  const filter = query.get("tab") ?? "Newest";
  const [questionResponse, setQuestionResponse] =
    useState<QuestionQueryResponse>();
  useEffect(() => {
    const doIt = async () => {
      setQuestionResponse(await getQuestions(1, 20, filter));
    };
    doIt().then();
  }, [filter]);

  return (
    <div className={styles.Questions}>
      <div className={styles.TopBar}>
        <h1>All Questions</h1>
        <Link to="/questions/ask" className={styles.AskQuestionButton}>
          Ask Question
        </Link>
      </div>
      <div className={styles.SecondBar}>
        <div className={styles.Total}>
          {questionResponse?.items_total} questions
        </div>
        <ul className={styles.FilterList}>
          <li>
            <Link to={"/questions?tab=Newest"}>Newest</Link>
          </li>
          <li>
            <Link to={"/questions?tab=Active"}>Active</Link>
          </li>
          <li>
            <Link to={"/questions?tab=Unanswered"}>Unanswered</Link>
          </li>
        </ul>
      </div>
      <div className={styles.QuestionList}>
        {questionResponse?.items?.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
