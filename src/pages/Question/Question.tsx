import React, { useMemo, useState, useEffect } from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";
import { api } from "../../api/api";
import { isAnswered, QuestionInterface } from "../../interface/interface";
import BeatLoader from "react-spinners/BeatLoader";

import AnswerPost from "./Post/AnswerPost";
import QuestionPost from "./Post/QuestionPost";

import styles from "./Question.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import ReactTimeAgo from "react-time-ago";
import { useSessionContext } from "../../contexts/SessionContext";

// const FILTERS = ["Active", "Oldest", "Votes"];

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Question: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionInterface>();
  const [answer, setAnswer] = useState<string>();
  const query = useQuery();
  const navigate = useNavigate();
  const filter = query.get("answertab") ?? "Votes";
  const { userInfo } = useSessionContext();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const isQuestionAnswered = useMemo(() => {
    return questionData ? isAnswered(questionData) : false;
  }, [questionData]);
  const sortedAnswerPosts = useMemo(
    () =>
      questionData?.answers
        ?.slice()
        ?.sort((a, b) => (a.accepted ? -1 : b.accepted ? 1 : 0)),
    [questionData]
  );

  // 리셋 필요할 때,
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionData(await api.getQuestion(Number(id)));
        setLoading(false);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            if (e.response.status === 400) {
              toast.error("Invalid question id");
              navigate("/questions");
            } else if (e.response.status === 404) {
              toast.error("The question does not exist");
              navigate("/questions");
            } else console.error(e.response.data);
          } else console.error(e);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [reset, id, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (answer) {
      try {
        await api.postAnswer(Number(id), answer);
        setAnswer("");
        setReset(!reset);
        toast.info("Answer posted!");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.error("Invalid answer id");
            } else if (err.response.status === 401) {
              toast.error("Please sign in first!");
              navigate("/login");
            } else console.error(err.response.data);
          } else console.error(err);
        } else console.error(err);
      }
    }
  };

  questionData?.answers.sort((a, b) => {
    if (filter === "Oldest") {
      return Number(a.createdAt) - Number(b.createdAt);
    } else {
      return b.votes - a.votes;
    }
  });

  return questionData ? (
    <div className={styles.Question}>
      {loading ? (
        <div className={styles.Loading}>
          <BeatLoader size={20} />
        </div>
      ) : (
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
              <ReactTimeAgo date={new Date(questionData.createdAt + "Z")} />
            </li>
            {/*
            <li>
              <span>Active</span>
              <time>today</time>
            </li>
            <li>
              <span>Viewd</span>9 times
            </li>
              */}
          </ul>

          <section className={styles.main}>
            <QuestionPost
              question={questionData}
              reset={reset}
              setReset={setReset}
            />
            <div className={styles.Answers}>
              <div className={styles.answerBar}>
                <h2>
                  {questionData.answers
                    ? `${questionData.answers.length} Answers`
                    : "Your Answer"}
                </h2>
                {/*
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
                */}
              </div>
              {sortedAnswerPosts?.map((answer) => (
                <AnswerPost
                  key={answer.id}
                  answer={answer}
                  questionId={questionData.id}
                  reset={reset}
                  setReset={setReset}
                  isAcceptable={
                    !isQuestionAnswered && userInfo?.id === questionData.user.id
                  }
                />
              ))}
            </div>
            <div className={styles.writeAnswer}>
              <h2>Your Answer</h2>
              <form onSubmit={handleSubmit}>
                <Markdown value={answer} onChange={setAnswer} />
                <div>
                  <BlueButton type="submit" text={"Post Your Answer"} />
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  ) : null;
};

export default Question;
