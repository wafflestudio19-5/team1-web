import React, { useMemo } from "react";

import styles from "./MyPageProfileDetail.module.scss";
import { Link } from "react-router-dom";

const MyPageProfileDetail = () => {
  const { userInfo } = useSessionContext();
  const posts = useMemo(
    () =>
      userInfo
        ? userInfo.questions
            .map(({ id, title }) => ({
              url: `/questions/${id}`,
              title,
              type: "question",
            }))
            .concat(
              /* TODO make proper answer url */
              userInfo.answers.map(({ id, questionTitle }) => ({
                url: `/questions/{question_id}#${id}`,
                title: questionTitle,
                type: "answer",
              }))
            )
        : null,
    [userInfo]
  );
  return userInfo ? (
    <div className={styles.myPageProfileDetail}>
      {/*
      <div className={styles.detailBox}>
        <span className={styles.title}>About</span>
        <div className={styles.detailInfo}>
          <span>
            our about me section is currently blank. Would you like to add one?
          </span>

          <Link className={styles.goEdit} to={"/mypage?tab=settings"}>
            Edit profile
          </Link>
        </div>
      </div>

      <div className={styles.detailBox}>
        <span className={styles.title}>Badges</span>
      </div>
       */}
      <div className={styles.detailBox}>
        <span className={styles.title}>Posts</span>
        <ul
          className={`${styles.detailInfo} ${
            posts?.length ? "" : styles.empty
          }`}
        >
          {posts?.length
            ? posts.map(({ url, title, type }) => (
                <ProfilePostItem
                  url={url}
                  title={title}
                  type={type}
                  key={url}
                />
              ))
            : "no posts"}
        </ul>
      </div>
    </div>
  ) : null;
};

export default MyPageProfileDetail;
