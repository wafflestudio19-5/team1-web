import React, { useState } from "react";

import { Link } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import BlueButton from "../../../Components/BlueButton/BlueButton";
import UserCard from "../../../Components/UserCard/UserCard";
import { Answer } from "../../../interface/interface";
import CommentItem from "../CommentItem/CommentItem";
import Vote from "../Vote/Vote";

import styles from "./Post.module.scss";
import { api } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

interface PostProps {
  answer?: Answer;
}

const AnswerPost: React.FC<PostProps> = ({ answer }) => {
  const [addOn, setAddOn] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const addComment = async () => {
    try {
      if (comment === "") {
        toast.success("comment를 입력하세요");
        return;
      }
      await api.postAnswerComment(0, comment);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.msg, { autoClose: 3000 });
      }
    }
  };

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
          <Link
            to={`/posts/${answer?.id}/edit`}
            state={{ body: answer?.body, isQuestion: false }}
          >
            <button>Edit</button>
          </Link>
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
