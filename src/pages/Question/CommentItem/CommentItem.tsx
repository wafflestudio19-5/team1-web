import React from "react";

import { AnswerComment, QuestionComment } from "../../../interface/interface";

import styles from "./CommentItem.module.scss";

interface CommentProps {
  comment?: AnswerComment | QuestionComment;
}

const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.commentContent}>
      <span>{comment?.id}</span>
      <p>{comment?.body}</p>
    </div>
  );
};

export default CommentItem;
