import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { QuestionItem } from "./QuestionItem/QuestionItem";
import BlueButton from "../../Components/BlueButton/BlueButton";
import { QuestionInterface } from "../../interface/interface";
import { api, SortCriteria, SortOrder } from "../../api/api";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { useQuery, makeQuery, makePageList } from "../../hooks/hooks";
import styles from "./Questions.module.scss";
import { toast } from "react-toastify";

const FILTERS: { label: string; criteria: SortCriteria; order: SortOrder }[] = [
  { label: "Newest", criteria: "createdAt", order: "desc" },
  { label: "Votes", criteria: "voteCount", order: "desc" },
];

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
  const search = useMemo(() => query.get("q"), [query]);

  // get data
  useEffect(() => {
    const doIt = async () => {
      try {
        setQuestionList(null);
        const { content, totalElements, totalPages } = search
          ? await api.searchQuestion(
              search,
              page - 1,
              filter.criteria,
              filter.order
            )
          : await api.getQuestionList(page - 1, filter.criteria, filter.order);
        setQuestionList(content);
        setCount(totalElements);
        setPageCount(totalPages);
        window.scrollTo(0, 0);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            toast.error("Unexpected error: " + e.response.status);
          } else toast.error("Cannot connect to server!");
        } else console.error(e);
      }
    };
    doIt().then();
  }, [page, filter, search]);

  return questionList ? (
    <div className={styles.questions}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <h1>{search ? "Search Results" : "All Questions"}</h1>
          <Link to="/questions/ask">
            <BlueButton text={"Ask Question"} />
          </Link>
        </div>
        {search && (
          <div className={styles.queryDisplay}>Results for "{search}"</div>
        )}
        <div className={styles.secondBar}>
          <div className={styles.total}>
            {count} {search ? "results" : "questions"}
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
