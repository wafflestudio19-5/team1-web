import React from "react";
import NumberAndKeyword from "./NumberAndKeyword/NumberAndKeyword";

import styles from "./MyStats.module.scss";
import { useSessionContext } from "../../../../contexts/SessionContext";

const MyStats = () => {
  const { userInfo } = useSessionContext();
  return userInfo ? (
    <div className={styles.myStats}>
      <span className={styles.title}>Stats</span>
      <div className={styles.statBox}>
        {/*
        <div className={styles.statLine}>
          <NumberAndKeyword number={0} keyword={"reputation"} />
          <NumberAndKeyword number={0} keyword={"reached"} />
        </div>
        */}
        <div className={styles.statLine}>
          <NumberAndKeyword
            number={userInfo.answers.length}
            keyword={"answers"}
          />
          <NumberAndKeyword
            number={userInfo.questions.length}
            keyword={"questions"}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default MyStats;
