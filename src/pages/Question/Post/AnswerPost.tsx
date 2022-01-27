import React, { useState } from "react";

import { Link } from "react-router-dom";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import UserCard from "../../../Components/UserCard/UserCard";
import { Answer } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";
import { useSessionContext } from "../../../contexts/SessionContext";
import styles from "./Post.module.scss";
import { api } from "../../../api/api";
import { toast } from "react-toastify";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import {
  MarkdownViewer,
  MarkdownCommentEditor,
} from "../../../Components/Markdown/Markdown";

interface PostProps {
  answer: Answer;
  questionId: number;
  reset: boolean;
  setReset(e: boolean): void;
  isAcceptable: boolean;
}

const AnswerPost: React.FC<PostProps> = ({
  answer,
  questionId,
  setReset,
  reset,
  isAcceptable,
}) => {
  const { userInfo } = useSessionContext();
  const auth = userInfo?.id === answer.user.id;
  const [onAdd, setOnAdd] = useState<boolean>(false);
  const [comment, setComment] = useState<string | undefined>("");

  const handleAddCommentButton = () => {
    if (userInfo) {
      setOnAdd(!onAdd);
    } else {
      toast.warn("로그인을 먼저 해주세요");
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await api.deleteAnswer(answer.id);
              setReset(!reset);
              toast.success("Answer deleted!");
            } catch (err) {
              if (axios.isAxiosError(err)) {
                if (err.response) {
                  if (err.response.status === 401) {
                    toast.error("Please sign in first!");
                  } else if (err.response.status === 403) {
                    toast.error("Cannot delete other user's answer");
                  } else if (err.response.status === 404) {
                    toast.error("The answer does not exist");
                  } else
                    toast.error("Unexpected error: " + err.response.status);
                } else toast.error("Cannot connect to server");
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
  };

  const handleCommentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (!comment || comment === "") {
        toast.error("댓글을 입력해주세요!");
        return;
      }
      await api.postAnswerComment(answer.id, comment);
      setReset(!reset);
      setOnAdd(false);
      setComment("");
      toast.success("Comment created!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.error("Please sign in first!");
          } else if (err.response.status === 404) {
            toast.error("The answer does not exist");
          } else if (err.response.status === 405) {
            toast.error("Invalid comment content");
          } else toast.error("Unexpected error: " + err.response.status);
        } else toast.error("Cannot connect to server");
      } else console.error(err);
    }
  };

  return (
    <div className={styles.answerPostLayout} id={`answer-${answer.id}`}>
      <div className={styles.voteCell}>
        <Vote
          vote={answer.votes}
          questionId={questionId}
          isAccepted={answer.accepted}
          isAcceptable={isAcceptable}
          answerId={answer.id}
          reset={reset}
          setReset={setReset}
        />
      </div>
      <div className={styles.postCell}>
        <div className={styles.postBody}>
          <MarkdownViewer className={styles.body} source={answer.body} />
        </div>

        <div className={styles.itemFooter}>
          {auth ? (
            <div className={styles.buttonList}>
              <Link
                to={`/posts/${answer.id}/edit`}
                state={{ body: answer.body, questionId: questionId }}
              >
                <button>Edit</button>
              </Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ) : (
            <div />
          )}
          <div className={styles.activityContainer}>
            <Link to={`/users/${userInfo?.id}`}>
              <UserCard
                user={answer.user}
                date={new Date(answer.createdAt + "Z")}
                isQuestion={false}
                isEdited={!!answer.editedAt}
                edited={
                  answer.editedAt ? new Date(answer.editedAt + "Z") : null
                }
              />
            </Link>
          </div>
        </div>
        <div className={styles.commentList}>
          {answer.comments.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                questionId={questionId}
                answerId={comment.answerId}
                reset={reset}
                setReset={setReset}
              />
            );
          })}
        </div>
        {onAdd ? (
          <>
            <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
              <MarkdownCommentEditor
                className={styles.container}
                value={comment}
                onChange={setComment}
              />
              <BlueButton type="submit" text={"Add Comment"} />
            </form>
            <button
              className={styles.cancelComment}
              onClick={() => {
                setOnAdd(!onAdd);
                setComment("");
              }}
            >
              cancel
            </button>
          </>
        ) : (
          <button
            className={styles.addComment}
            onClick={handleAddCommentButton}
          >
            Add a comment
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerPost;
