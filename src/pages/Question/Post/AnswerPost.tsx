import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import BlueButton from "../../../Components/BlueButton/BlueButton";
import UserCard from "../../../Components/UserCard/UserCard";
import { countVotes, Answer } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";
import { dummyApi, _getCurrentUser } from "../../../api/dummyApi";
import { useSessionContext } from "../../../contexts/SessionContext";

import styles from "./Post.module.scss";
import { api } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

interface PostProps {
  answer: Answer;
  questionId: number;
  reset: boolean;
  setReset(e: boolean): void;
}

const AnswerPost: React.FC<PostProps> = ({
  answer,
  questionId,
  setReset,
  reset,
}) => {
  const { userInfo } = useSessionContext();
  const auth = userInfo?.id === answer.user.id;
  const navigate = useNavigate();
  const [onAdd, setOnAdd] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const handleDelete = async () => {
    try {
      await api.deleteAnswer(answer.id);
      setReset(!reset);
      // navigate(`/questions/${questionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (comment === "") {
        toast.error("답변을 입력해주세요!");
        return;
      }
      await api.postQuestionComment(questionId, comment);
      // navigate(`/questions/${questionId}`);
      setReset(!reset);
      setOnAdd(false);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // const addComment = async () => {
  //   try {
  //     if (comment === "") {
  //       toast.error("답변을 입력해주세요!");
  //       return;
  //     }
  //     await api.postAnswerComment(answer.id, comment);

  //     // setReset(!reset);
  //     setComment("");
  //     navigate(`/questions/${questionId}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className={styles.answerPostLayout}>
      <div className={styles.voteCell}>
        <Vote
          vote={answer.votes}
          questionId={questionId}
          accepted={answer.accepted}
          answerId={answer.id}
          reset={reset}
          setReset={setReset}
        />
      </div>
      <div className={styles.postCell}>
        <div className={styles.postBody}>
          <MDEditor.Markdown className={styles.body} source={answer.body} />
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
            <UserCard
              user={answer.user}
              timestamp="2021-11-26 20:45:00Z"
              isQuestion={false}
              isEdited={false}
            />
          </div>
        </div>
        <div className={styles.commentList}>
          {answer.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              questionId={questionId}
              answerId={comment.answerId}
              reset={reset}
              setReset={setReset}
            />
          ))}
        </div>
        {onAdd ? (
          <>
            <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
            onClick={() => {
              setOnAdd(!onAdd);
            }}
          >
            Add a comment
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerPost;
