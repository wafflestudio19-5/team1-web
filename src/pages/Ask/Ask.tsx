import React from "react";

import BlueButton from "../../Components/BlueButton/BlueButton";
import Markdown from "../../Components/Markdown/Markdown";

import styles from "./Ask.module.scss";

const Ask: React.FC = () => {
  return (
    <>
      <div className={styles.ask}>
        <div className={styles.header}>
          <h1>Ask a public question</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <label>Title</label>
            <p className={styles.tip}>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              max-length="300"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
          </div>
          <div className={styles.body}>
            <label>Body</label>
            <p className={styles.tip}>
              Include all the information someone would need to answer your
              question
            </p>
            <Markdown />
          </div>
          <div className={styles.tags}>
            <label>Tags</label>
            <p className={styles.tip}>
              Add up to 5 tags to describe what your question is about
            </p>
            <input
              max-length="300"
              placeholder="e.g. (asp.net-mvc typescript database)"
            />
          </div>
        </div>
        <div className={styles.postButton}>
          <BlueButton text={"Post your question"} />
        </div>
      </div>
    </>
  );
};

export default Ask;
