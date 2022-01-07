import React from "react";
import NumberAndKeyword from "./NumberAndKeyword/NumberAndKeyword";

import styles from "./MyStats.module.scss";

const MyStats = () => {
  return (
    <div className={styles.myStats}>
      <span className={styles.title}>Stats</span>
      <div className={styles.statBox}>
        <div className={styles.statLine}>
          <NumberAndKeyword number={0} keyword={"reputation"} />
          <NumberAndKeyword number={0} keyword={"reached"} />
        </div>
        <div className={styles.statLine}>
          <NumberAndKeyword number={0} keyword={"answers"} />
          <NumberAndKeyword number={0} keyword={"questions"} />
        </div>
      </div>
    </div>
  );
};

export default MyStats;
