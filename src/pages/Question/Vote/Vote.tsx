import React, { useCallback } from "react";

import { ReactComponent as ArrowDown } from "../../../icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../../icons/iconArrowUp.svg";
import { ReactComponent as Check } from "../../../icons/iconCheck.svg";
import { ReactComponent as GreyCheck } from "../../../icons/greyCheck.svg";

import styles from "./Vote.module.scss";
import { api } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
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
  const { userInfo } = useSessionContext();
  const handleVote = async (vote: -1 | 1) => {
    try {
      answerId
        ? await api.voteAnswer(answerId, vote)
        : await api.voteQuestion(questionId, vote);
      setReset(!reset);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 405) {
            console.error("Invalid status", err.response.data);
          } else if (err.response.status === 404) {
            toast.error("The post does not exists");
          } else if (err.response.status === 401) {
            toast.error("Please sign in first");
          } else toast.error("Unexpected error: " + err.response.status);
        } else toast.error("Cannot connect to server");
      } else console.error(err);
    }
  };
  const handleVoteUp = () => handleVote(1);
  const handleVoteDown = () => handleVote(-1);
  const handleAcceptToggle = useCallback(async () => {
    if (!answerId) return;
    try {
      const wasAccepted = isAccepted;
      await api.toggleAnswerAccept(questionId, answerId);
      setReset(!reset);
      if (wasAccepted) {
        toast.info("Accept canceled!");
      } else {
        toast.info("Answer accepted!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 401) {
            if (userInfo) {
              toast.error("Cannot accept an answer on other user's question");
            } else {
              toast.error("Please sign in first");
            }
          } else if (err.response.status === 400) {
            toast.error("Another answer is already accepted!");
          } else if (err.response.status === 404) {
            toast.error("Question or answer does not exist");
          } else toast.error("Unexpected error: " + err.response.status);
        } else toast.error("Cannot connect to server");
      } else console.error(err);
    }
  }, [answerId, isAccepted, questionId, reset, setReset, userInfo]);

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
        <button className={styles.answerChecked} onClick={handleAcceptToggle}>
          <Check />
        </button>
      )}
      {!isAccepted && answerId && isAcceptable && (
        <button onClick={handleAcceptToggle}>
          <GreyCheck />
        </button>
      )}
    </>
  );
};

export default Vote;
