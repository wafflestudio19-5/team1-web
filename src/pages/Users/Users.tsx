import React, { useState, useEffect, useMemo } from "react";

import { Link } from "react-router-dom";

import User from "./User/User";
import { UserSummary } from "../../interface/interface";
import { useQuery, makePageList, makeQuery } from "../../hooks/hooks";
import BeatLoader from "react-spinners/BeatLoader";
import { api } from "../../api/api";
import axios from "axios";

import styles from "./Users.module.scss";

const Users = () => {
  const [users, setUsers] = useState<UserSummary[]>();
  const query = useQuery();
  const page = useMemo(() => {
    const rawPage = Number.parseInt(query.get("page") ?? "1");
    return rawPage >= 1 ? rawPage : 1;
  }, [query]);
  const [pageCount, setPageCount] = useState(0);
  const pageList = useMemo(
    () => makePageList(page, pageCount),
    [page, pageCount]
  );

  // get data
  useEffect(() => {
    const doIt = async () => {
      try {
        const { content, totalPages } = await api.getUserList(
          page - 1,
          "id",
          "desc"
        );
        setUsers(content);
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
  }, [page]);

  return users ? (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1>{"Users"}</h1>
      </div>
      <div className={styles.cards_container}>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
      <div className={styles.pageNumberList}>
        {page > 1 && (
          <Link className={styles.pageButton} to={makeQuery("id", page - 1)}>
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
              to={makeQuery("id", n)}
              key={`${n}_${i}`}
            >
              {n}
            </Link>
          )
        )}
        {page < pageCount && (
          <Link className={styles.pageButton} to={makeQuery("id", page + 1)}>
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

export default Users;
