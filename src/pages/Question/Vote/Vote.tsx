import React from "react";

import { ReactComponent as ArrowDown } from "../icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "../icons/iconArrowUp.svg";
import { ReactComponent as Bookmark } from "../icons/iconBookmark.svg";
import { ReactComponent as Check } from "../icons/iconCheck.svg";

import styles from "./Vote.module.scss";

interface VoteProps {
  vote: number;
  accepted?: boolean;
}

const Vote: React.FC<VoteProps> = ({ vote, accepted }) => {
  return (
    <>
      <button>
        <ArrowUp />
      </button>
      <div className={styles.voteCount}>{vote}</div>
      <button>
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
