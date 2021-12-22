import React, { useState } from "react";

import { Link } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import BlueButton from "../../../Components/BlueButton/BlueButton";
import TagItem from "../../../Components/TagItem/TagItem";
import UserCard from "../../../Components/UserCard/UserCard";
import { QuestionInterface } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";

import styles from "./Post.module.scss";

interface PostProps {
  question?: QuestionInterface;
}

const QuestionPost: React.FC<PostProps> = ({ question }) => {
  const [addOn, setAddOn] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  return (
    <div className={styles.questionPostLayout}>
      <div className={styles.voteCell}>
        <Vote vote={10} />
      </div>
      <div className={styles.postCell}>
        <div className={styles.postBody}>
          <MDEditor.Markdown className={styles.body} source={question?.body} />
        </div>

        <div className={styles.tagList}>
          {question?.tags?.map((tag) => (
            <TagItem key={tag.id} tag={tag.name} />
          ))}
        </div>

        <div className={styles.itemFooter}>
          <Link
            to={`/posts/${question?.id}/edit`}
            state={{
              title: question?.title,
              body: question?.body,
              isQuestion: true,
            }}
          >
            <button>Edit</button>
          </Link>

          <div className={styles.activityContainer}>
            <UserCard user={question?.user!} timestamp={question?.createdAt!} />
          </div>
        </div>
        <div className={styles.commentList}>
          {question?.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {addOn ? (
            <>
              <form>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <BlueButton text={"Add Comment"} />
              </form>
              <button
                className={styles.cancelComment}
                onClick={() => setAddOn(!addOn)}
              >
                cancel
              </button>
            </>
          ) : (
            <button
              className={styles.addComment}
              onClick={() => setAddOn(!addOn)}
            >
              Add a comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPost;
