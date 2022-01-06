import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { QuestionComment, AnswerComment } from "../../../interface/interface";

import { ReactComponent as Edit } from "../../../icons/iconEdit.svg";
import { ReactComponent as Delete } from "../../../icons/iconDelete.svg";
import dayjs from "dayjs";

import styles from "./CommentItem.module.scss";
import { api } from "../../../api/api";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import { useSessionContext } from "../../../contexts/SessionContext";

interface CommentProps {
  comment: QuestionComment | AnswerComment;
  questionId: number;
  reset: boolean;
  setReset(e: boolean): void;
  answerId?: number;
}

const CommentItem: React.FC<CommentProps> = ({
  comment,
  questionId,
  answerId,
  reset,
  setReset,
}) => {
  const date = new Date();
  const { userInfo } = useSessionContext();
  const auth = userInfo?.id === comment.user.id;
  const navigate = useNavigate();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [edited, setEdited] = useState<string>("");
  console.log(comment.body);

  const handleEdit = () => {
    setOnEdit(!onEdit);
    setEdited(comment.body);
  };

  const handleDelete = async () => {
    if (questionId) {
      try {
        answerId
          ? await api.deleteAnswerComment(answerId, comment.id)
          : await api.deleteQuestionComment(questionId, comment.id);
        // navigate(`/questions/${questionId}`);
        setReset(!reset);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (questionId) {
      try {
        answerId
          ? await api.editAnswerComment(answerId, comment.id, edited)
          : await api.editQuestionComment(questionId, comment.id, edited);
        setReset(!reset);
        setOnEdit(false);
        setEdited("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className={styles.commentContent}>
        <span />
        {onEdit ? (
          <div>
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={edited}
                onChange={(e) => setEdited(e.target.value)}
              />
              <BlueButton type="submit" text={"Save eidts"} />
            </form>
            <button
              className={styles.cancelEdit}
              onClick={() => setOnEdit(!onEdit)}
            >
              cancel
            </button>
          </div>
        ) : (
          <>
            <p>{comment.body}</p>
            <label>
              <p>–</p>
              <Link to={`/users/${comment.user.id}`}>
                <button className={styles.username}>
                  {" "}
                  {comment.user.username}
                </button>
              </Link>
              <p className={styles.date}>
                {dayjs(date).format("MMM DD 'YY")} at{" "}
                {dayjs(date).format("HH:mm")}
              </p>
            </label>{" "}
          </>
        )}

        {auth && !onEdit && (
          <>
            <button onClick={handleEdit}>
              <Edit className={styles.editButton} />
            </button>
            <button onClick={handleDelete}>
              <Delete className={styles.deleteButton} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CommentItem;
