import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import { MarkdownEditor } from "../../Components/Markdown/Markdown";
import { api, SortCriteria, SortOrder } from "../../api/api";
import {
  isAnswered,
  QuestionInterface,
  Answer,
} from "../../interface/interface";
import BeatLoader from "react-spinners/BeatLoader";

import AnswerPost from "./Post/AnswerPost";
import QuestionPost from "./Post/QuestionPost";

import styles from "./Question.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import ReactTimeAgo from "react-time-ago";
import { useSessionContext } from "../../contexts/SessionContext";
import { hoursBetween, dayFormat, useQuery } from "../../hooks/hooks";

const FILTERS: { label: string; criteria: SortCriteria; order: SortOrder }[] = [
  { label: "Newest", criteria: "createdAt", order: "asc" },
  { label: "Votes", criteria: "voteCount", order: "desc" },
];

const makeQuery = (filter: string) => `?answertab=${filter}`;

const Question: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionInterface>();
  const [answerList, setAnswerList] = useState<Answer[] | null>(null);
  const [answer, setAnswer] = useState<string>();
  const query = useQuery();
  const filter = useMemo(() => {
    const rawFilter = query.get("answertab") ?? "Newest";
    return FILTERS.find((e) => e.label === rawFilter) ?? FILTERS[0];
  }, [query]);
  const navigate = useNavigate();
  const { userInfo } = useSessionContext();
  const { id } = useParams();
  const between = hoursBetween(new Date(questionData?.createdAt + "Z"));
  const dateFormat = dayFormat(new Date(questionData?.createdAt + "Z"));

  const isQuestionAnswered = useMemo(() => {
    return questionData ? isAnswered(questionData) : false;
  }, [questionData]);

  const sortedAnswerPosts = useMemo(
    () =>
      answerList
        ?.slice()
        ?.sort((a, b) => (b.accepted ? 1 : 0) - (a.accepted ? 1 : 0)),
    [answerList]
  );

  // 리셋 필요할 때,
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionData(await api.getQuestion(Number(id)));
        const { content } = await api.getAnswerList(
          Number(id),
          filter.criteria,
          filter.order
        );
        setAnswerList(content);
        window.scrollTo(0, 0);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            if (e.response.status === 400) {
              toast.error("Invalid question id");
              navigate("/questions", { replace: true });
            } else if (e.response.status === 404) {
              toast.error("The question does not exist");
              navigate("/questions", { replace: true });
            } else console.error(e.response.data);
          } else console.error(e);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [reset, id, navigate, filter]);

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
            } else console.error(err.response.data);
          } else console.error(err);
        } else console.error(err);
      }
    } else {
      toast.error("Post is empty!");
    }
  };

  const onAskButtonClick = useCallback(() => {
    if (userInfo) {
      navigate("/questions/ask");
    } else {
      toast.error("Please log in first");
    }
  }, [navigate, userInfo]);

  return questionData ? (
    <div className={styles.Question}>
      <div className={styles.Content}>
        <section className={styles.questionHeader}>
          <h1>{questionData?.title}</h1>
          <BlueButton text={"Ask Question"} onClick={onAskButtonClick} />
        </section>
        <ul className={styles.postInfo}>
          <li>
            <span>Asked</span>
            {between < 24 ? (
              <ReactTimeAgo date={new Date(questionData.createdAt + "Z")} />
            ) : (
              dateFormat
            )}
          </li>
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
                {answerList ? `${answerList.length} Answers` : "Your Answer"}
              </h2>

              <div className={styles.filterList}>
                {FILTERS.map((elem) => (
                  <Link
                    className={`${styles.filterItem} ${
                      elem === filter ? styles.selected : ""
                    }`}
                    key={elem.label}
                    to={makeQuery(elem.label)}
                  >
                    {elem.label}
                  </Link>
                ))}
              </div>
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
              <MarkdownEditor value={answer} onChange={setAnswer} />
              <div>
                <BlueButton type="submit" text={"Post Your Answer"} />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <BeatLoader />
    </div>
  );
};

export default Question;
