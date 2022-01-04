import React from "react";

import { Link, useNavigate } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import UserCard from "../../../Components/UserCard/UserCard";
import { countVotes, Answer } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";
import { dummyApi, _getCurrentUser } from "../../../api/dummyApi";

import styles from "./Post.module.scss";

interface PostProps {
  answer: Answer;
  questionId: number;
}

const AnswerPost: React.FC<PostProps> = ({ answer, questionId }) => {
  const auth = _getCurrentUser()?.id === answer.user.id;
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await dummyApi.deleteAnswer(answer.id);
    } catch (err) {
      console.error(err);
    }
    navigate(`/questions/${questionId}`);
  };

  return (
    <div className={styles.answerPostLayout}>
      <div className={styles.voteCell}>
        <Vote
          vote={countVotes(answer)}
          questionId={answer.id}
          accepted={answer.accepted}
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
              isQuestion={true}
              isEdited={false}
            />
          </div>
        </div>
        <div className={styles.commentList}>
          {answer.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              answerId={comment.answerId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerPost;
