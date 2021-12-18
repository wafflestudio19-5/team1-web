import React, { useMemo, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";
import { dummyApi } from "../../api/dummyApi";
import { QuestionInterface } from "../../interface/interface";

import AnswerPost from "./Post/AnswerPost";
import QuestionPost from "./Post/QuestionPost";

import styles from "./Question.module.scss";

const FILTERS = ["Active", "Oldest", "Votes"];

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Question: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionInterface>();
  const query = useQuery();
  const filter = query.get("answertab") ?? "Votes";
  const location = useLocation();

  useEffect(() => {
    const doIt = async () => {
      try {
        const response = await dummyApi.getQuestion(101);
        setQuestionData(response);
      } catch (e) {
        console.log(e);
      }
    };
    doIt().then();
  }, [filter]);

  return (
    <div className={styles.Question}>
      <div className={styles.Content}>
        <section className={styles.questionHeader}>
          <h1>{questionData?.title}</h1>
          <Link to="/questions/ask">
            <BlueButton text={"Ask Question"} />
          </Link>
        </section>
        <ul className={styles.postInfo}>
          <li>
            <span>Asked</span>
            <time>today</time>
          </li>
          <li>
            <span>Active</span>
            <time>today</time>
          </li>
          <li>
            <span>Viewd</span>9 times
          </li>
        </ul>

        <section className={styles.main}>
          <QuestionPost question={questionData} />
          <div className={styles.Answers}>
            <div className={styles.answerBar}>
              <h2>
                {questionData?.answers
                  ? `${questionData.answers.length} Answers`
                  : "Your Answer"}
              </h2>
              <div className={styles.filterList}>
                {FILTERS.map((value) => (
                  <Link
                    className={`${styles.filterItem} ${
                      value === filter ? styles.selected : ""
                    }`}
                    key={value}
                    to={`${location.pathname}?answertab=${value}`}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>
            {questionData?.answers.map((answer) => (
              <AnswerPost key={answer.id} answer={answer} />
            ))}
          </div>
          <div className={styles.writeAnswer}>
            <h2>Your Answer</h2>
            <Markdown />
          </div>
          <BlueButton text={"Post Your Answer"} />
        </section>
      </div>
    </div>
  );
};

export default Question;
