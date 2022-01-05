import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { QuestionComment, AnswerComment } from "../../../interface/interface";

import { ReactComponent as Edit } from "../../../icons/iconEdit.svg";
import { ReactComponent as Delete } from "../../../icons/iconDelete.svg";
import dayjs from "dayjs";

import styles from "./CommentItem.module.scss";
import { _getCurrentUser, dummyApi } from "../../../api/dummyApi";
import BlueButton from "../../../Components/BlueButton/BlueButton";

interface CommentProps {
  comment: QuestionComment | AnswerComment;
  questionId?: number;
  answerId?: number;
}

const CommentItem: React.FC<CommentProps> = ({
  comment,
  questionId,
  answerId,
}) => {
  const date = new Date();
  const auth = _getCurrentUser()?.id === comment.user.id;
  const navigate = useNavigate();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [edited, setEdited] = useState<string>("");

  const handleEdit = () => {
    setOnEdit(!onEdit);
    setEdited(comment.body);
  };

  const handleDelete = async () => {
    if (questionId) {
      try {
        answerId
          ? await dummyApi.deleteAnswerComment(answerId, comment.id)
          : await dummyApi.deleteQuestionComment(questionId, comment.id);
      } catch (err) {
        console.error(err);
      }
    }
    navigate(`/questions/${questionId}`);
  };

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (questionId) {
      if (!edited) {
        alert("no edited!");
        return;
      }
      try {
        answerId
          ? await dummyApi.editAnswerComment(answerId, comment.id, edited)
          : await dummyApi.editQuestionComment(questionId, comment.id, edited);
      } catch (err) {
        console.error(err);
      }
      setOnEdit(false);
      setEdited("");
      navigate(`/questions/${questionId}`);
    }
  };

  return (
    <>
      <div className={styles.commentContent}>
        <span>{comment.id}</span>
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
