import React, { FC } from "react";

import answerType from "../../../../../icons/a.png";
import questionType from "../../../../../icons/q.png";
import { HashLink } from "react-router-hash-link";
import { dayFormat } from "../../../../../hooks/hooks";

import styles from "./ProfilePostItem.module.scss";

interface ProfilePostItemProps {
  url: string;
  title: string;
  type: string;
  createdAt: string;
}

const ProfilePostItem: FC<ProfilePostItemProps> = ({
  url,
  title,
  type,
  createdAt,
}) => {
  // const formattedDate = new Date(createdAt + "Z").toDateString();
  const formattedDate = dayFormat(new Date(createdAt + "Z")).split("at")[0];
  return (
    <li className={styles.item} key={url}>
      {type === "answer" ? (
        <img src={answerType} alt={"answer"} />
      ) : (
        <img src={questionType} alt={"question"} />
      )}
      <HashLink to={url}>{title}</HashLink>
      <div className={styles.date}>{formattedDate}</div>
    </li>
  );
};

export default ProfilePostItem;
