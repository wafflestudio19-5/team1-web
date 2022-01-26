import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import errorPicture from "./error.png";
export const ErrorPage = () => {
  const onClickSearch = useCallback(() => {
    const searchBox = document.getElementById("search-box");
    searchBox?.focus();
  }, []);
  return (
    <div className={styles.errorPage}>
      <div className={styles.column}>
        <img src={errorPicture} alt={"404 Not Found"} />
      </div>
      <div className={`${styles.center} ${styles.column}`}>
        <h1>Page not found</h1>
        <h2>We're sorry, we couldn't find the page you requested.</h2>
        <p>
          Try&nbsp;
          <span className={styles.blueLink} onClick={onClickSearch}>
            searching for similar questions
          </span>
        </p>
        <p>
          Browse our&nbsp;
          <Link className={styles.blueLink} to="/questions">
            recent questions
          </Link>
        </p>
      </div>
    </div>
  );
};
