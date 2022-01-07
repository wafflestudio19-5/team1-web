import React, { useCallback } from "react";

import { ReactComponent as ArrowDown } from "../../../icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../../icons/iconArrowUp.svg";
import { ReactComponent as Check } from "../../../icons/iconCheck.svg";
import { ReactComponent as GreyCheck } from "../../../icons/greyCheck.svg";

import styles from "./Vote.module.scss";
import { api } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../../../contexts/SessionContext";

interface VoteProps {
  vote: number;
  isAcceptable: boolean;
  isAccepted: boolean;
  questionId: number;
  answerId: number | null;
  reset: boolean;
  setReset(e: boolean): void;
}

const Vote: React.FC<VoteProps> = ({
  vote,
  isAcceptable,
  isAccepted,
  questionId,
  answerId,
  reset,
  setReset,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useSessionContext();
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
          navigate("/login");
        } else console.error(err.response.data);
      } else console.error(err);
    }
  };
  const handleVoteUp = () => handleVote(1);
  const handleVoteDown = () => handleVote(-1);
  const handleAnswerAccept = useCallback(async () => {
    if (!answerId) return;
    try {
      await api.acceptAnswer(questionId, answerId);
      setReset(!reset);
      toast.info("Answer accepted!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          if (userInfo) {
            toast.error("Cannot accept an answer on other user's question");
          } else {
            toast.error("Please sign in first");
          }
        } else if (err.response.status === 404) {
          toast.error("Question or answer does not exist");
        } else console.error(err.response.data);
      } else console.error(err);
    }
  }, [answerId, questionId, reset, setReset, userInfo]);

  return (
    <>
      <button onClick={handleVoteUp}>
        <ArrowUp />
      </button>
      <div className={styles.voteCount}>{vote}</div>
      <button onClick={handleVoteDown}>
        <ArrowDown />
      </button>
      {isAccepted && (
        <div className={styles.answerChecked}>
          <Check />
        </div>
      )}
      {answerId && isAcceptable && (
        <button onClick={handleAnswerAccept}>
          <GreyCheck />
        </button>
      )}
    </>
  );
};

export default Vote;
