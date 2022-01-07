import { Link } from "react-router-dom";
import React, { FC } from "react";
import styles from "./ProfilePostItem.module.scss";
import answerType from "./a.png";
import questionType from "./q.png";

interface ProfilePostItemProps {
  url: string;
  title: string;
  type: string;
}

const ProfilePostItem: FC<ProfilePostItemProps> = ({ url, title, type }) => {
  return (
    <li className={styles.item} key={url}>
      {type === "answer" ? (
        <img src={answerType} alt={"answer"} />
      ) : (
        <img src={questionType} alt={"question"} />
      )}
      <Link to={url}>{title}</Link>
    </li>
  );
};

export default ProfilePostItem;
