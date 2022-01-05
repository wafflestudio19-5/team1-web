import React from "react";

import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowDown } from "../../../icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../../icons/iconArrowUp.svg";
import { ReactComponent as Bookmark } from "../../../icons/iconBookmark.svg";
import { ReactComponent as Check } from "../../../icons/iconCheck.svg";

import { dummyApi } from "../../../api/dummyApi";

import styles from "./Vote.module.scss";

interface VoteProps {
  vote: number;
  accepted?: boolean;
  questionId: number;
}

const Vote: React.FC<VoteProps> = ({ vote, accepted, questionId }) => {
  const navigate = useNavigate();

  const handleVoteUp = async () => {
    try {
      await dummyApi.voteQuestion(questionId, 1);
      navigate(`/questions/${questionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoteDown = async () => {
    try {
      await dummyApi.voteQuestion(questionId, -1);
      navigate(`/questions/${questionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={handleVoteUp}>
        <ArrowUp />
      </button>
      <div className={styles.voteCount}>{vote}</div>
      <button onClick={handleVoteDown}>
        <ArrowDown />
      </button>
      {accepted ? (
        <div className={styles.answerChecked}>
          <Check />
        </div>
      ) : (
        // Question Post
        accepted !== false && (
          <button>
            <Bookmark />
          </button>
        )
      )}
    </>
  );
};

export default Vote;
