import React, { useState } from "react";

import { Link } from "react-router-dom";

import { QuestionComment, AnswerComment } from "../../../interface/interface";

import { ReactComponent as Edit } from "../../../icons/iconEdit.svg";
import { ReactComponent as Delete } from "../../../icons/iconDelete.svg";

import { api } from "../../../api/api";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import { useSessionContext } from "../../../contexts/SessionContext";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {
  MarkdownCommentEditor,
  MarkdownViewer,
} from "../../../Components/Markdown/Markdown";
import { dayFormat } from "../../../hooks/hooks";

import styles from "./CommentItem.module.scss";

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
  const { userInfo } = useSessionContext();
  const auth = userInfo?.id === comment.user.id;
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [edited, setEdited] = useState<string | undefined>("");
  const daysBetween =
    new Date().getDate() - new Date(comment.createdAt).getDate();
  const dateFormat = dayFormat(new Date(comment.createdAt + "Z"));
  const handleEdit = () => {
    setOnEdit(!onEdit);
    setEdited(comment.body);
  };

  const handleDelete = () => {
    if (questionId) {
      confirmAlert({
        title: "Confirm",
        message: "Are you sure?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                answerId
                  ? await api.deleteAnswerComment(comment.id)
                  : await api.deleteQuestionComment(comment.id);
                setReset(!reset);
                toast.info("Comment deleted!");
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  if (err.response) {
                    if (err.response.status === 400) {
                      toast.error("Invalid comment id");
                    } else if (err.response.status === 401) {
                      if (userInfo) {
                        toast.error("Cannot remove other user's comment");
                      } else {
                        toast.error("Please sign in first");
                      }
                    } else if (err.response.status === 404) {
                      toast.error("The comment does not exist");
                    } else console.error(err.response.data);
                  } else console.error(err);
                } else console.error(err);
              }
            },
          },
          {
            label: "Cancel",
            onClick: () => {},
          },
        ],
      });
    }
  };

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (questionId) {
      try {
        if (edited === "") {
          toast.error("댓글을 입력해주세요!");
          return;
        }
        answerId
          ? await api.editAnswerComment(comment.id, edited || "")
          : await api.editQuestionComment(comment.id, edited || "");
        setReset(!reset);
        setOnEdit(false);
        setEdited("");
        toast.info("Comment edited!");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 400) {
              toast.error("Invalid comment id or content");
            } else if (err.response.status === 401) {
              toast.error("Please sign in first");
            } else if (err.response.status === 404) {
              toast.error("The comment does not exist");
            } else console.error(err.response.data);
          } else console.error(err);
        } else console.error(err);
      }
    }
  };

  return (
    <>
      <div className={styles.commentContent}>
        {onEdit ? (
          <div className={styles.commetEdit}>
            <form onSubmit={handleEditSubmit}>
              <MarkdownCommentEditor
                className={styles.container}
                value={edited}
                onChange={setEdited}
              />
              <BlueButton type="submit" text={"Save edits"} />
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
            <MarkdownViewer
              className={styles.commentBody}
              source={comment.body}
            />

            <label>
              <div>–</div>
              <div className={styles.username}>
                <Link to={`/users/${comment.user.id}`}>
                  {comment.user.username}
                </Link>
              </div>
              <div className={styles.date}>
                {daysBetween < 1 ? (
                  <ReactTimeAgo date={new Date(comment.createdAt + "Z")} />
                ) : (
                  dateFormat
                )}
              </div>
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
            </label>
          </>
        )}
      </div>
    </>
  );
};

export default CommentItem;
