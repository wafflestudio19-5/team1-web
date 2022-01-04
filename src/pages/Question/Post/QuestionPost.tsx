import React from "react";

import { Link } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import TagItem from "../../../Components/TagItem/TagItem";
import UserCard from "../../../Components/UserCard/UserCard";
import { countVotes, QuestionInterface } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";
import { _getCurrentUser } from "../../../api/dummyApi";

import styles from "./Post.module.scss";

interface PostProps {
  question: QuestionInterface;
}

const QuestionPost: React.FC<PostProps> = ({ question }) => {
  const auth = _getCurrentUser()?.id === question.user.id;

  return (
    <div className={styles.questionPostLayout}>
      <div className={styles.voteCell}>
        <Vote vote={countVotes(question)} questionId={question.id} />
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
      </div>
    </div>
  );
};

export default QuestionPost;
