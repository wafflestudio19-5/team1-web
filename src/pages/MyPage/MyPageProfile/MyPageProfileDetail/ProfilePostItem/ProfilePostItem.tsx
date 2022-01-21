import React, { FC } from "react";
import styles from "./ProfilePostItem.module.scss";
import answerType from "./a.png";
import questionType from "./q.png";
import { HashLink } from "react-router-hash-link";

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
  const formattedDate = new Date(createdAt + "Z").toDateString();
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
