import React from 'react';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import styles from './Question.module.scss';

const Question: React.FC = () => {
  return (
    <div className={styles.Question}>
      <div className={styles.Content}>
        <div className={styles.innerContent}>
          <section className={styles.questionHeader}>
            <h1>
              Cannot chagne the dorm in the elements panel while source is
              paused in Chrome 96 dev tools - do I miss a setting?
            </h1>
            <ButtonUnstyled className={styles.askButton}>
              <p>Ask Question</p>
            </ButtonUnstyled>
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
            <div className={styles.questionSection}>
              <div className={styles.postLayout}>
                <div className={`${styles.voteCell} ${styles.postLayoutLeft}`}>
                  <div className={styles.voteBox}>투표</div>
                </div>
                <div className={`${styles.postCell} ${styles.postLayoutRight}`}>
                  내용
                </div>
                <div className={styles.postComment}>
                  <div className={styles.Comments}>
                    <ul className={styles.commentList}>
                      <li>Sounds like a bug in devtools.</li>
                      <li>
                        yeah. it looks like its buggy on local websites, not on
                        live ones
                      </li>
                    </ul>
                  </div>
                  <div className={styles.addComment}>Add a comment</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Question;
