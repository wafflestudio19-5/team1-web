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
      summary: "Lorem Ipsum",
      votes: +5,
      answersCount: 0,
      tags: ["react", "react-dom"],
      last_activity: {
        action: "asked",
        timestamp: "2021-11-25 20:45:00Z",
        user: {
          id: 1,
          image: "",
          name: "foobar",
        },
      },
    },
    {
      id: 2,
      title: "Foo Bar Baz",
      summary: "Lorem Ipsum",
      votes: -2,
      answersCount: 1,
      tags: ["nodejs", "typescript"],
      last_activity: {
        action: "asked",
        timestamp: "2021-11-26 20:45:00Z",
        user: {
          id: 2,
          image: "",
          name: "foobar",
        },
      },
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
  return dummyResponse;
};

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const FILTERS = ["Newest", "Active", "Unanswered", "Frequent", "Votes"];

const Questions = () => {
  const query = useQuery();
  const filter = query.get("tab") ?? "Newest";
  const [questionResponse, setQuestionResponse] =
    useState<QuestionQueryResponse>();
  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionResponse(await getQuestions(1, 20, filter));
      } catch (e) {
        // prevent silent error while developing
        console.log(e);
      }
    };
    doIt().then();
  }, [filter]);

  return (
    <div className={styles.questions}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <h1>All Questions</h1>
          <Link to="/questions/ask" className={styles.askQuestionButton}>
            Ask Question
          </Link>
        </div>
        <div className={styles.secondBar}>
          <div className={styles.total}>
            {questionResponse?.items_total} questions
          </div>
          <div className={styles.filterList}>
            {FILTERS.map((value) => (
              <Link
                className={`${styles.filterItem} ${value === filter ? styles.selected : ""}`}
                key={value}
                to={`/questions?tab=${value}`}
              >
                {value}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.questionList}>
        {questionResponse?.items?.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
