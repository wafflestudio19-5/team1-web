import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import BlueButton from "../../../Components/BlueButton/BlueButton";
import TagItem from "../../../Components/TagItem/TagItem";
import UserCard from "../../../Components/UserCard/UserCard";
import { countVotes, QuestionInterface } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";
import { dummyApi, _getCurrentUser } from "../../../api/dummyApi";

import styles from "./Post.module.scss";

interface PostProps {
  question: QuestionInterface;
}

const QuestionPost: React.FC<PostProps> = ({ question }) => {
  const auth = _getCurrentUser()?.id === question.user.id;
  const [onAdd, setOnAdd] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  const handleCommentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (question.id) {
      try {
        await dummyApi.postQuestionComment(question.id, value);
      } catch (err) {
        console.error(err);
      }
      setOnAdd(false);
      setValue("");
      navigate(`/questions/${question.id}`);
    }
  };

  return (
    <div className={styles.questionPostLayout}>
      <div className={styles.voteCell}>
        <Vote
          vote={countVotes(question)}
          questionId={question.id}
          answerId={undefined}
        />
      </div>
      <div className={styles.postCell}>
        <div className={styles.postBody}>
          <MDEditor.Markdown className={styles.body} source={question.body} />
        </div>

        <div className={styles.tagList}>
          {question.tags?.map((tag) => (
            <TagItem key={tag.id} tag={tag.name} />
          ))}
        </div>

        <div className={styles.itemFooter}>
          {auth ? (
            <Link
              to={`/posts/${question.id}/edit`}
              state={{
                title: question.title,
                body: question.body,
                questionId: question.id,
              }}
            >
              <button>Edit</button>
            </Link>
          ) : (
            <div />
          )}

          <div className={styles.activityContainer}>
            <UserCard
              user={question.user}
              timestamp={question.createdAt}
              isQuestion={true}
              isEdited={question.updatedAt ? true : false}
            />
          </div>
        </div>
        <div className={styles.commentList}>
          {question.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              questionId={comment.questionId}
            />
          ))}
        </div>
        {onAdd ? (
          <>
            <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <BlueButton type="submit" text={"Add Comment"} />
            </form>
            <button
              className={styles.cancelComment}
              onClick={() => {
                setOnAdd(!onAdd);
                setValue("");
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

export default QuestionPost;
