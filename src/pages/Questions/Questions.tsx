import React, { useEffect, useMemo, useState } from "react";

import styles from "./Questions.module.scss";
import { Link } from "react-router-dom";
import { QuestionItem } from "./QuestionItem/QuestionItem";
import { useLocation } from "react-router";
import BlueButton from "../../Components/BlueButton/BlueButton";
import { QuestionInterface } from "../../interface/interface";
import { api, SortCriteria, SortOrder } from "../../api/api";
import axios from "axios";
import { useSessionContext } from "../../contexts/SessionContext";
import BeatLoader from "react-spinners/BeatLoader";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const FILTERS: { label: string; criteria: SortCriteria; order: SortOrder }[] = [
  { label: "Newest", criteria: "createdAt", order: "desc" },
  // "Active",
  // "Unanswered",
  // "Frequent",
  // { label: "Votes", criteria: "votes", order: "desc" },
];

const makePageList = (
  currentPage: number,
  totalPages: number
): ("..." | number)[] => {
  if (totalPages <= 10) {
    let l = [];
    for (let i = 1; i <= totalPages; i++) l.push(i);
    return l;
  } else if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  } else if (currentPage >= totalPages - 4) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  }
};

const makeQuery = (filter: string, page: number) =>
  `?tab=${filter}&page=${page}`;

const Questions = () => {
  const query = useQuery();
  const filter = useMemo(() => {
    const rawFilter = query.get("tab") ?? "Newest";
    return FILTERS.find((e) => e.label === rawFilter) ?? FILTERS[0];
  }, [query]);
  const page = useMemo(() => {
    const rawPage = Number.parseInt(query.get("page") ?? "1");
    return rawPage >= 1 ? rawPage : 1;
  }, [query]);
  const [questionList, setQuestionList] = useState<QuestionInterface[] | null>(
    null
  );
  const [count, setCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const pageList = useMemo(
    () => makePageList(page, pageCount),
    [page, pageCount]
  );
  const { userInfo } = useSessionContext();

  // get data
  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionList(null);
        const { content, totalElements, totalPages } =
          await api.getQuestionList(page - 1, filter.criteria, filter.order);
        setQuestionList(content);
        setCount(totalElements);
        setPageCount(totalPages);
        window.scrollTo(0, 0);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            console.error(e.response.status, e.response.data);
          } else console.error(e);
        } else console.error(e);
      }
    };
    doIt().then();
  }, [page, filter]);

  return questionList ? (
    <div className={styles.questions}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <h1>All Questions</h1>
          {userInfo && (
            <Link to="/questions/ask">
              <BlueButton text={"Ask Question"} />
            </Link>
          )}
        </div>
        <div className={styles.secondBar}>
          <div className={styles.total}>
            {count ? `${count} questions` : `No question`}
          </div>
          <div className={styles.filterList}>
            {FILTERS.map((elem) => (
              <Link
                className={`${styles.filterItem} ${
                  elem === filter ? styles.selected : ""
                }`}
                key={elem.label}
                to={makeQuery(elem.label, elem === filter ? page : 1)}
              >
                {elem.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.questionList}>
        {questionList.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <div className={styles.pageNumberList}>
        {page > 1 && (
          <Link
            className={styles.pageButton}
            to={makeQuery(filter.label, page - 1)}
          >
            Prev
          </Link>
        )}
        {pageList.map((n, i) =>
          n === "..." ? (
            <span className={styles.pageSpan} key={`${n}_${i}`}>
              ...
            </span>
          ) : (
            <Link
              className={`${styles.pageButton} ${
                page === n ? styles.current : ""
              }`}
              to={makeQuery(filter.label, n)}
              key={`${n}_${i}`}
            >
              {n}
            </Link>
          )
        )}
        {page < pageCount && (
          <Link
            className={styles.pageButton}
            to={makeQuery(filter.label, page + 1)}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <BeatLoader />
    </div>
  );
};

export default Questions;
