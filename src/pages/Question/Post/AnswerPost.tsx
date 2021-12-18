import React, { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import BlueButton from "../../../Components/BlueButton/BlueButton";
import UserCard from "../../../Components/UserCard/UserCard";
import { Answer } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";

import styles from "./Post.module.scss";

interface PostProps {
  answer?: Answer;
}

const AnswerPost: React.FC<PostProps> = ({ answer }) => {
  const [addOn, setAddOn] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  return (
    <div className={styles.answerPostLayout}>
      <div className={styles.voteCell}>
        <Vote vote={20} accepted={answer?.accepted} />
      </div>
      <div className={styles.postCell}>
        <div className={styles.postBody}>
          <MDEditor.Markdown className={styles.body} source={answer?.body} />
        </div>

        <div className={styles.itemFooter}>
          <button>Edit</button>
          <div className={styles.activityContainer}>
            <UserCard user={answer?.user!} timestamp="2021-11-26 20:45:00Z" />
          </div>
        </div>
        <div className={styles.commentList}>
          {answer?.comments.map((comment) => (
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

export default AnswerPost;
