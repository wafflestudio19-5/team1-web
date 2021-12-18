import React from "react";

import styles from "./NumberAndKeyword.module.scss";

type NumberAndKeywordProps = {
  number: number;
  keyword: string;
};

const NumberAndKeyword: React.FC<NumberAndKeywordProps> = ({
  number,
  keyword,
}) => {
  return (
    <div className={styles.numberAndKeyword}>
      <span className={styles.number}>{number}</span>
      <span className={styles.keyword}>{keyword}</span>
    </div>
  );
};

export default NumberAndKeyword;
