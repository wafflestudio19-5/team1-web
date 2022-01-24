import React, { FC, useMemo } from "react";

import styles from "./MyPageProfileDetail.module.scss";
import ProfilePostItem from "./ProfilePostItem/ProfilePostItem";
import { Link } from "react-router-dom";
import { UserInfoResponse } from "../../../../interface/interface";

const MyPageProfileDetail: FC<{ userInfo: UserInfoResponse; me: boolean }> = ({
  userInfo,
  me,
}) => {
  const posts = useMemo(
    () =>
      userInfo
        ? userInfo.questions
            .map(({ id, title, createdAt }) => ({
              url: `/questions/${id}`,
              title,
              type: "question",
              createdAt,
            }))
            .concat(
              userInfo.answers.map(
                ({ questionTitle, createdAt, questionId, id }) => ({
                  url: `/questions/${questionId}#answer-${id}`,
                  title: questionTitle,
                  type: "answer",
                  createdAt,
                })
              )
            )
            .sort(({ createdAt: a }, { createdAt: b }) =>
              a > b ? -1 : a < b ? +1 : 0
            )
        : null,
    [userInfo]
  );
  return (
    <div className={styles.myPageProfileDetail}>
      <div className={styles.detailBox}>
        <span className={styles.title}>About</span>
        <div className={`${styles.detailInfo} ${styles.about}`}>
          {userInfo.aboutMe ??
            (me && (
              <>
                Your about me section is currently blank. Would you like to
                &nbsp;
                <Link className={styles.goEdit} to={"?tab=settings"}>
                  add one?
                </Link>
              </>
            ))}
        </div>
      </div>
      <div className={styles.detailBox}>
        <span className={styles.title}>Posts</span>
        <ul
          className={`${styles.detailInfo} ${
            posts?.length ? "" : styles.empty
          }`}
        >
          {posts?.length
            ? posts.map(({ url, title, type, createdAt }) => (
                <ProfilePostItem
                  url={url}
                  title={title}
                  type={type}
                  createdAt={createdAt}
                  key={url}
                />
              ))
            : "no posts"}
        </ul>
      </div>
    </div>
  );
};

export default MyPageProfileDetail;
