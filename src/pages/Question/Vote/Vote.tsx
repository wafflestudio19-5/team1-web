import React from "react";

import { ReactComponent as ArrowDown } from "../../../icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../../icons/iconArrowUp.svg";
import { ReactComponent as Check } from "../../../icons/iconCheck.svg";

import styles from "./Vote.module.scss";
import { api } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

interface VoteProps {
  vote: number;
  accepted?: boolean;
  questionId: number;
  answerId: number | undefined;
  reset: boolean;
  setReset(e: boolean): void;
}

const Vote: React.FC<VoteProps> = ({
  vote,
  accepted,
  questionId,
  answerId,
  reset,
  setReset,
}) => {
  const handleVote = async (vote: -1 | 1) => {
    try {
      answerId
        ? await api.voteAnswer(answerId, vote)
        : await api.voteQuestion(questionId, vote);
      setReset(!reset);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400 || err.response.status === 405) {
          console.error("Invalid status", err.response.data);
        } else if (err.response.status === 404) {
          toast.error("The post does not exists");
        } else if (err.response.status === 401) {
          toast.error("Please sign in first");
        } else console.error(err.response.data);
      } else console.error(err);
    }
  };
  const handleVoteUp = () => handleVote(1);
  const handleVoteDown = () => handleVote(-1);

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
      ) : null}
    </>
  );
};

export default Vote;
