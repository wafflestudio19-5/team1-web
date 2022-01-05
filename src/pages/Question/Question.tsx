import React, { useMemo, useState, useEffect } from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";
import { dummyApi } from "../../api/dummyApi";
import { api } from "../../api/api";
import { QuestionInterface } from "../../interface/interface";
import BeatLoader from "react-spinners/BeatLoader";

import AnswerPost from "./Post/AnswerPost";
import QuestionPost from "./Post/QuestionPost";

import styles from "./Question.module.scss";
import axios from "axios";
import { api } from "../../api/api";
import { toast } from "react-toastify";

const FILTERS = ["Active", "Oldest", "Votes"];

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
  const location = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [answer, setAnswer] = useState<string | undefined>("");

  // 리셋 필요할 때,
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionData(await dummyApi.getQuestion(Number(id)));
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    doIt().then();
<<<<<<< HEAD
  }, [filter, reset]);

  const submitAnswer = async () => {
    try {
      if (answer === "") {
        toast.error("답변을 입력해주세요!", { autoClose: 3000 });
        return;
      }
      await api.postAnswer(101, answer ?? "");
      setAnswer("");

      // 다시 데이터 불러오도록 하기 위해서
      setReset(!reset);
    } catch (e) {
      if (axios.isAxiosError(e)) {
=======
  }, [filter, id]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (answer) {
      try {
        await dummyApi.postAnswer(Number(id), answer);
        setAnswer("");
        navigate(`/questions/${id}`);
      } catch (err) {
        console.error(err);
>>>>>>> 9f0d2e9204a3ffd10ca4922aa1612d34ede99ba7
      }
    }
  };

  return (
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
            <QuestionPost question={questionData!} />
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
                <AnswerPost
                  key={answer.id}
                  answer={answer}
                  questionId={questionData.id}
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
<<<<<<< HEAD
            {questionData?.answers.map((answer) => (
              <AnswerPost key={answer.id} answer={answer} />
            ))}
          </div>
          <div className={styles.writeAnswer}>
            <h2>Your Answer</h2>
            <Markdown state={answer} setState={setAnswer} />
            <BlueButton text={"Post Your Answer"} onClick={submitAnswer} />
          </div>
        </section>
      </div>
=======
          </section>
        </div>
      )}
>>>>>>> 9f0d2e9204a3ffd10ca4922aa1612d34ede99ba7
    </div>
  );
};

export default Question;
