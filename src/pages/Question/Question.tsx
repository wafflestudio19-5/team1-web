import React, { useState } from "react";

import { Link } from "react-router-dom";

import { ReactComponent as ArrowDown } from "./icons/iconArrowDown.svg";
import { ReactComponent as ArrowUp } from "./icons/iconArrowUp.svg";
import { ReactComponent as Bookmark } from "./icons/iconBookmark.svg";

import styles from "./Question.module.scss";

const Question: React.FC = () => {
  const [vote, setVote] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<string>>();
  const [answer, setAnswer] = useState<string>("");

  const onIncrease = () => setVote((prev) => prev + 1);
  const onDecrease = () => setVote((prev) => prev - 1);

  return (
    <div className={styles.Question}>
      <div className={styles.Content}>
        <section className={styles.questionHeader}>
          <h1>
            Cannot chagne the dorm in the elements panel while source is paused
            in Chrome 96 dev tools - do I miss a setting?
          </h1>
          <button className={styles.askButton}>
            <Link to="/questions/ask">Ask Question</Link>
          </button>
        </section>
        <ul className={styles.postInfo}>
          <li>
            <span>Asked</span>
            <time>today</time>
          </li>
          <li>
            <span>Active</span>
            <time>today</time>
          </li>
          <li>
            <span>Viewd</span>9 times
          </li>
        </ul>

        <section className={styles.main}>
          <div className={styles.postLayout}>
            <div className={styles.voteCell}>
              <button className="vote-up" onClick={onIncrease}>
                <ArrowUp />
              </button>
              <div className={styles.voteCount}>{vote}</div>
              <button className="vote-down" onClick={onDecrease}>
                <ArrowDown />
              </button>
              <button className="bookmark">
                <Bookmark />
              </button>
            </div>
            <div className={styles.postCell}>
              <div className={styles.postBody}>
                <p>
                  Is there any way to revert or undo git pull so that my
                  source/repos will come to old state that was before doing git
                  pull ? I want to do this because it merged some files which I
                  didnt want to do so, but only merge other remaining files. So,
                  I want to get those files back, is that possible?
                </p>
              </div>
              <ul className={styles.tagList}>
                <li>git</li>
                <li>version-control</li>
                <li>git-merge</li>
              </ul>

              <div className={styles.Footer}>
                <ul className={styles.postMenuList}>
                  <button>Share</button>
                  <button>Edit</button>
                  <button>Follow</button>
                </ul>
                <div className={styles.postSignature}>User Info</div>
              </div>
            </div>
          </div>
          <div className={styles.Answer}>
            {answers && (
              <>
                {answers.map((answer, id) => (
                  <div key={id}>{answer}</div>
                ))}
              </>
            )}
            <form>
              <h2>Your Answer</h2>
              <input
                className={styles.postAnswer}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className={styles.postButton} type="submit">
                Post Your Answer
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
