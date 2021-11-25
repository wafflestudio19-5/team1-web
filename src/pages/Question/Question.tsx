import React from 'react';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import styles from './Question.module.scss';

const Question: React.FC = () => {
  return (
    <div className={styles.Question}>
      <div className={styles.Content}>
        <div className={styles.innerContent}>
          <div className={styles.questionHeader}>
            <h1>
              Cannot chagne the dorm in the elements panel while source is
              paused in Chrome 96 dev tools - do I miss a setting?
            </h1>
            <ButtonUnstyled className={styles.askButton}>
              <p>Ask Question</p>
            </ButtonUnstyled>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Question;
